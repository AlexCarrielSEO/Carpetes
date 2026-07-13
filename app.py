import os
import pymongo
from bson.objectid import ObjectId
from flask import Flask, render_template, request, redirect, url_for, flash, session

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "chave_secreta_autorizada_sorocaba_2026")

# Configurações do MongoDB com fallback automático para mongomock
try:
    mongo_uri = os.environ.get("MONGO_URI", "mongodb://localhost:27017/")
    client = pymongo.MongoClient(mongo_uri, serverSelectionTimeoutMS=1500)
    client.server_info()  # Testa a conexão
    print("Conexão estabelecida com o MongoDB real com sucesso.")
except Exception as e:
    print(f"MongoDB real indisponível ({e}). Iniciando mongomock para emulação de banco de dados em memória.")
    import mongomock
    client = mongomock.MongoClient()

db = client["autorizada_db"]

# Criação de índices para máxima performance de buscas e ordenação (Conforme solicitado)
db.sections.create_index([("section_id", pymongo.ASCENDING)], unique=True)
db.sections.create_index([("active", pymongo.ASCENDING), ("order", pymongo.ASCENDING)])
db.categories.create_index([("slug", pymongo.ASCENDING)])
db.services.create_index([("slug", pymongo.ASCENDING)])
db.blog_posts.create_index([("slug", pymongo.ASCENDING)])

# Lista de cidades atendidas para geração de GEO SEO
CIDADES = [
    {"name": "Sorocaba", "slug": "sorocaba"},
    {"name": "Votorantim", "slug": "votorantim"},
    {"name": "Itu", "slug": "itu"},
    {"name": "Salto", "slug": "salto"},
    {"name": "Araçoiaba da Serra", "slug": "aracoiaba"},
    {"name": "Piedade", "slug": "piedade"},
    {"name": "Iperó", "slug": "ipero"},
    {"name": "Alumínio", "slug": "aluminio"}
]

# Função para semear o banco de dados com conteúdo inicial completo, real e otimizado para SEO
def seed_database():
    # 1. Semear Layout da Página Inicial (Seções dinâmicas)
    if db.sections.count_documents({}) == 0:
        sections = [
            {
                "section_id": "hero",
                "name": "Seção Hero (Banner Principal)",
                "order": 1,
                "active": True,
                "content": {
                    "badge": "Chegada em até 90 min • Sorocaba e Região",
                    "title": "Conserto de Geladeira e Máquina de Lavar em Sorocaba em até 90 Minutos",
                    "subtitle": "Frota própria de motos e carros de apoio. Técnicos Wericles e Valdevino. Atendimento 24H em Sorocaba, Votorantim, Itu, Salto, Araçoiaba, Piedade, Iperó e Alumínio com garantia de 90 dias.",
                    "tag1": "⭐ 4.9 no Google",
                    "tag2": "+8.500 atendimentos",
                    "tag3": "Wericles e Valdevino",
                    "button_primary_text": "Solicitar Técnico Agora",
                    "button_primary_link": "#orcamento",
                    "button_secondary_text": "Ver Preços",
                    "button_secondary_link": "#servicos",
                    "image_url": "static/img/frost_free_refrigerator_technician.webp",
                    "time_badge_title": "Tempo médio hoje",
                    "time_badge_value": "43 minutos",
                    "time_badge_desc": "Centro, Campolim, Wanel Ville e Mangal"
                }
            },
            {
                "section_id": "sobre",
                "name": "Seção Sobre Nós",
                "order": 2,
                "active": True,
                "content": {
                    "title": "Sua geladeira e máquina de lavar em mãos de quem tem 15 anos de estrada em Sorocaba",
                    "description": "Nós somos o Wericles e o Valdevino. Não somos uma empresa terceirizada gigante que cobra taxas absurdas e manda curiosos para a sua casa. Somos técnicos locais e de confiança. Há 15 anos começamos rodando Sorocaba de moto para salvar alimentos que iam estragar em geladeiras desligadas e roupas acumuladas em máquinas que se recusavam a centrifugar. Hoje, nossa frota é ágil, usamos ferramentas de diagnóstico importadas de ponta, peças originais com garantia de 90 dias descrita em contrato e oferecemos atendimento rápido em 90 minutos para tirar a dor de cabeça do cliente.",
                    "experience_badge": "15 anos de experiência local"
                }
            },
            {
                "section_id": "cobertura",
                "name": "Seção Cobertura Geográfica",
                "order": 3,
                "active": True,
                "content": {
                    "title": "Cobertura total em Sorocaba e região próxima",
                    "subtitle": "Se você buscou por 'técnico de geladeira perto de mim', nossa moto está a poucos minutos da sua casa com ferramentas e peças a postos.",
                    "base_address": "Rua Monsenhor João Soares, 648 - Centro, Sorocaba/SP"
                }
            },
            {
                "section_id": "faq_home",
                "name": "Seção Dúvidas Frequentes da Home",
                "order": 4,
                "active": True,
                "content": {
                    "title": "Tire suas dúvidas rápidas sobre nossos serviços",
                    "subtitle": "Informação transparente e sem enrolação diretamente dos técnicos Wericles e Valdevino.",
                    "q1": "Quanto custa a visita técnica em Sorocaba?",
                    "a1": "A nossa taxa de visita é de apenas R$ 89, valor que é integralmente abatido no orçamento aprovado para o conserto.",
                    "q2": "Qual o tempo médio de chegada do técnico?",
                    "a2": "Em média, chegamos em até 90 minutos em qualquer bairro de Sorocaba e Votorantim.",
                    "q3": "Vocês dão garantia no serviço realizado?",
                    "a3": "Sim! Todos os nossos consertos acompanham garantia de 90 dias em contrato assinado, cobrindo peças e mão de obra.",
                    "q4": "Trabalham com peças originais?",
                    "a4": "Trabalhamos exclusivamente com peças originais das principais marcas (Brastemp, Consul, Electrolux) para evitar retornos e garantir durabilidade.",
                    "q5": "Atendem aos sábados, domingos e feriados?",
                    "a5": "Atendimento emergencial 24 horas todos os dias da semana. Geladeira desligada não pode esperar até segunda-feira!"
                }
            },
            {
                "section_id": "footer",
                "name": "Rodapé e Formulário de Contato",
                "order": 5,
                "active": True,
                "content": {
                    "contact_title": "Fale com o Técnico Wericles Agora pelo WhatsApp",
                    "contact_subtitle": "Envie uma mensagem detalhando o defeito. Respondemos em até 5 minutos para agendar sua visita hoje mesmo.",
                    "address": "Rua Monsenhor João Soares, 648 - Sorocaba/SP",
                    "phone": "(15) 99134-0446",
                    "whatsapp": "5515991340446",
                    "copyright": "© 2026 Autorizada Sorocaba Refrigeração - Wericles e Valdevino"
                }
            }
        ]
        db.sections.insert_many(sections)
        print("Seções de layout dinâmico semeadas com sucesso.")

    # 2. Semear Categorias de Linha Branca (com 10 FAQs cada)
    if db.categories.count_documents({}) == 0:
        categories = [
            {
                "name": "Geladeiras e Refrigeradores",
                "slug": "geladeira",
                "meta_description": "Conserto especializado de geladeira e refrigerador duplex, frost free e inverse. Técnicos Wericles e Valdevino. Garantia em Sorocaba.",
                "description": "Seja uma geladeira Frost Free, Inverse ou Side by Side, sabemos a dor que é ver toda a sua feira da semana estragando, a carne descongelando e o prejuízo se acumulando. A geladeira é o coração de qualquer lar. Aqui na região de Sorocaba, o calor não perdoa e um eletrodoméstico parado por mais de algumas horas gera enorme estresse familiar. Com mais de 15 anos de consertos diários na região, dominamos o diagnóstico de placas eletrônicas queimadas por picos de energia, problemas de carga de gás, entupimentos de dreno e falhas no compressor.",
                "faqs": [
                    {"q": "Qual o valor médio para consertar uma geladeira em [CITY]?", "a": "O preço varia conforme o defeito, mas a visita custa R$89 (que é descontada do conserto). A mão de obra costuma ficar entre R$180 e R$480 dependendo da complexidade."},
                    {"q": "Vocês atendem geladeira Frost Free que não gela embaixo em [CITY]?", "a": "Sim! Esse é o problema mais comum e geralmente é causado por bloqueio de gelo no dreno ou sensor de degelo com defeito. Resolvemos no mesmo dia."},
                    {"q": "Vale a pena trocar o motor (compressor) da geladeira?", "a": "Se a geladeira estiver em bom estado de conservação externa e interna, vale muito a pena, pois o valor do conserto representa cerca de 30% a 40% do preço de uma geladeira nova equivalente."},
                    {"q": "Minha geladeira está estalando muito forte, o que pode ser?", "a": "Estalos normais ocorrem devido à dilatação térmica do plástico interno. No entanto, estalos repetidos acompanhados de silêncio (motor tentando ligar) indicam falha no relé de partida ou no próprio compressor."},
                    {"q": "Quanto tempo demora para a geladeira voltar a gelar após o conserto?", "a": "Geralmente ela atinge a temperatura ideal de conservação entre 4 a 8 horas após ser ligada novamente na tomada."},
                    {"q": "Como evitar que minha geladeira queime com quedas de energia em [CITY]?", "a": "Recomendamos o uso de protetores de surto específicos para tomadas de eletrodomésticos, evitando que a placa eletrônica receba picos de tensão quando a energia retorna."},
                    {"q": "Por que a borracha da porta da minha geladeira está descolando ou não veda?", "a": "O desgaste natural resseca a borracha ou acumula gordura. Fazemos a troca rápida da borracha de vedação no próprio local em [CITY] para evitar o desperdício de energia."},
                    {"q": "Vocês atendem geladeiras industriais e comerciais em [CITY]?", "a": "Atendemos geladeiras comerciais, cervejeiras, balcões refrigerados de padarias e pequenos comércios locais."},
                    {"q": "Geladeira vazando água por baixo por que acontece?", "a": "Na maioria das vezes é o dreno de degelo obstruído por sujeira. A água transborda da calha interna e escorre para o chão da cozinha. Desobstruímos isso rapidamente."},
                    {"q": "Vocês consertam marcas importadas ou Side by Side em [CITY]?", "a": "Sim, somos especialistas em modelos complexos como Side by Side, French Door e Inverse das marcas Brastemp, Samsung, LG e Electrolux."}
                ]
            },
            {
                "name": "Máquinas de Lavar e Lava e Seca",
                "slug": "maquina-de-lavar",
                "meta_description": "Manutenção profissional de máquina de lavar roupas e lava e seca. Agilidade em Sorocaba e região. Resolva hoje.",
                "description": "Roupa suja acumulada é sinônimo de casa de pernas para o ar, principalmente para quem tem crianças ou rotina apertada. Quando a máquina de lavar se recusa a centrifugar, faz um barulho ensurdecedor de turbina de avião ou simplesmente se nega a dar partida no painel, o desespero bate. Há 15 anos realizamos a mecânica completa de lavadoras em Sorocaba. Trocamos rolamentos barulhentos, retentores que vazam água preta por baixo, bombas de drenagem queimadas, pressostatos desregulados e placas de comando com componentes oxidados pelo vapor do banheiro ou umidade da lavanderia.",
                "faqs": [
                    {"q": "Por que a máquina de lavar não está centrifugando em [CITY]?", "a": "Isso geralmente ocorre devido a uma falha na eletrobomba de drenagem, atuador de freio danificado ou interruptor da tampa com defeito. O conserto é rápido e feito na visita."},
                    {"q": "Minha lavadora está fazendo um barulho muito forte na centrifugação. O que é?", "a": "Barulho de metal batendo ou rangido forte indica desgaste total nos rolamentos e retentor da mecânica. É preciso trocar o kit mecânico para evitar que queime o motor."},
                    {"q": "Quanto custa consertar a placa da máquina de lavar?", "a": "A substituição ou reparo da placa de potência/interface varia de R$220 a R$520, dependendo da marca e modelo da lavadora."},
                    {"q": "Vocês atendem lavadoras Lava e Seca em [CITY]?", "a": "Sim! Temos técnicos altamente capacitados para os códigos de erro de painel de Lava e Seca Samsung, LG, Electrolux e Midea."},
                    {"q": "Por que a máquina de lavar está vazando água por baixo?", "a": "Pode ser mangueira furada, retentor da mecânica estourado ou trinca no próprio tanque. Agendamos vistoria imediata para diagnosticar."},
                    {"q": "Como limpar o filtro da lavadora para evitar cheiro ruim?", "a": "O filtro de fiapos deve ser lavado sob água corrente semanalmente. Para higienização profunda, faça um ciclo completo usando 1 litro de alvejante ou vinagre com a máquina vazia."},
                    {"q": "Minha máquina de lavar treme demais e sai do lugar, tem conserto em [CITY]?", "a": "Sim! Isso acontece quando os tirantes laterais que sustentam o tanque estão quebrados, ou quando os pés niveladores estão desregulados. Trocamos as suspensões na hora."},
                    {"q": "Vocês dão garantia na mecânica da máquina de lavar?", "a": "Sim, damos garantia completa de 90 dias em todas as trocas de mecânica e rolamentos realizada em [CITY]."},
                    {"q": "Vale a pena consertar uma lavadora antiga de 10 anos?", "a": "Lavadoras antigas como as Brastemp Mondial ou Clean são extremamente robustas e têm peças baratas. Quase sempre vale muito a pena recuperar."},
                    {"q": "Quais marcas de máquina de lavar vocês atendem em [CITY]?", "a": "Atendemos Brastemp, Consul, Electrolux, Colormaq, Samsung, LG, Panasonic e Midea."}
                ]
            }
        ]
        db.categories.insert_many(categories)
        print("Categorias e FAQ de SEO semeadas com sucesso.")

    # 3. Semear Serviços (Artigos únicos escritos sob a perspectiva do técnico de 15 anos)
    if db.services.count_documents({}) == 0:
        services = [
            {
                "title": "Conserto de Geladeira Frost Free que não Gela embaixo",
                "slug": "geladeira-nao-gela-embaixo",
                "category_slug": "geladeira",
                "meta_description": "Problema clássico de geladeira frost free que não resfria a parte inferior. Saiba a causa real e a solução do técnico Wericles em Sorocaba.",
                "article": """Eu sou o técnico Wericles e, nesses 15 anos consertando geladeira em Sorocaba, eu já perdi a conta de quantas vezes cheguei na casa de um cliente desesperado porque a geladeira dele estava 'fingindo que trabalhava'. O congelador lá em cima estava uma pedra de gelo, mas a parte de baixo, onde ficam o leite, o queijo e a janta, parecia um armário quente. O cliente abre a porta, sente aquele bafo morno e já pensa: 'Meu Deus, o motor queimou, vou gastar 2 mil reais em outra'.

Deixa eu te dar o meu testemunho real: na grande maioria das vezes, o motor está novinho, trabalhando perfeito! O que acontece é um entupimento no sistema de degelo automático da Frost Free. O dreno que escoa a água do degelo fica entupido por sujeira ou resíduos, a água congela no dreno, obstrui o duto de ar e cria uma parede gigante de gelo atrás do painel do freezer. Como o ar gelado não consegue descer, a geladeira para de funcionar embaixo enquanto o ventilador de cima trabalha até cansar sem resolver nada.

A minha solução é direta, honesta e definitiva: nós vamos até a sua residência com nosso equipamento especializado, desmontamos o painel interno com total cuidado, realizamos o degelo térmico completo com soprador controlado para não danificar as peças plásticas, desobstruímos o dreno e, mais importante, testamos a resistência e trocamos o sensor de temperatura de degelo e o termo-fusível por peças originais novas. Nada de gambiarra! Você recebe a garantia de 90 dias assinada no papel. Eu dou a minha palavra de técnico veterano de Sorocaba de que sua geladeira volta a funcionar como nova, sem sustos na hora do orçamento!""",
                "faqs": [
                    {"q": "Por que a geladeira frost free bloqueia de gelo e para de gelar embaixo em [CITY]?", "a": "Isso acontece devido a uma falha no kit de degelo: ou a resistência queimou, ou o sensor de degelo está lendo a temperatura errada, impedindo o ciclo de limpeza periódica de gelo."},
                    {"q": "Posso resolver isso apenas desligando a geladeira da tomada por 24 horas?", "a": "Desligar por 24 horas derrete o gelo acumulado temporariamente e ela volta a funcionar por alguns dias, mas como a peça com defeito não foi trocada, o duto voltará a bloquear de gelo em 1 ou 2 semanas."},
                    {"q": "Qual o custo para trocar o sensor de degelo em [CITY]?", "a": "O preço da troca do sensor de degelo mais a mão de obra costuma ficar entre R$220 e R$380, utilizando peças originais e garantia em contrato."},
                    {"q": "O dreno entupido causa mau cheiro dentro da geladeira?", "a": "Sim, pois a água misturada com resíduos de alimentos fica acumulada no fundo da canaleta interna antes de transbordar, gerando proliferação de bactérias e mau odor."},
                    {"q": "Vocês trocam a resistência de degelo na minha casa?", "a": "Sim, fazemos todo o reparo de forma limpa e organizada na própria cozinha do cliente, sem necessidade de retirar a geladeira."},
                    {"q": "Como funciona o duto de ar (Damper) da geladeira?", "a": "O damper é uma portinha termostática que regula quanto ar gelado do congelador desce para a parte inferior. Se ele quebrar fechado, a parte de baixo fica quente; se quebrar aberto, congela as verduras embaixo."},
                    {"q": "Em quanto tempo o técnico Wericles chega para resolver isso em [CITY]?", "a": "Nosso tempo médio de chegada em bairros de Sorocaba e Votorantim é de até 90 minutos após a ligação."},
                    {"q": "A falta de gás faz a geladeira não gelar embaixo?", "a": "Geralmente, quando há vazamento ou falta de gás, a geladeira para de gelar por completo (tanto o freezer quanto a parte de baixo ficam mornos) e o motor funciona sem parar."},
                    {"q": "Qual a diferença entre dreno entupido e sensor de degelo queimado?", "a": "O dreno entupido causa acúmulo visível de água embaixo das gavetas de legumes. O sensor queimado faz o congelador virar um bloco maciço de gelo invisível por trás da parede interna."},
                    {"q": "Quais marcas de Frost Free vocês atendem em [CITY]?", "a": "Atendemos Brastemp, Consul, Electrolux, Samsung, LG, Continental, Bosch e GE."}
                ]
            },
            {
                "title": "Conserto de Máquina de Lavar que não Centrifuga",
                "slug": "maquina-de-lavar-nao-centrifuga",
                "category_slug": "maquina-de-lavar",
                "meta_description": "Sua máquina de lavar roupas bate mas não centrifuga ou não joga água para fora? Entenda o diagnóstico do técnico Valdevino em Sorocaba.",
                "article": """Aqui quem fala é o técnico Valdevino. Tem coisa mais irritante do que você programar a máquina para lavar a roupa de trabalho ou de escola dos filhos, e quando vai olhar, a lavadora parou cheia de água suja, com as roupas boiando, sem ter a força para centrifugar? Esse é um dos chamados mais frequentes que recebo aqui na nossa base em Sorocaba. O cliente fica com baldes tirando água gelada, torcendo calça jeans grossa na mão, com aquela dor nas costas.

Deixa eu te explicar com a experiência de quem vive isso há 15 anos: quando a lavadora bate a roupa normal, mas na hora de girar rápido para centrifugar ela simplesmente silencia ou fica fazendo um zumbido baixinho de motor preso, o problema quase nunca é o motor queimado. Na maioria das vezes, o problema está na Eletrobomba de Drenagem. Se a bomba queimar por desgaste ou travar por causa de uma moeda, um grampo de cabelo ou botão que caiu do bolso, a máquina não consegue esvaziar. E as placas modernas têm um sistema de segurança: se a água não sair 100% em poucos minutos, ela se recusa a centrifugar para evitar estragar o eixo.

Outro vilão comum é o Atuador de Freio ou o próprio Capacitor de Partida do motor. O capacitor é como o empurrão inicial que o motor precisa para vencer o peso da roupa molhada. Se ele enfraquece, o motor tenta girar, mas não tem força e desliga por proteção térmica. Nós resolvemos isso de forma muito simples e honesta: avaliamos a bomba, limpamos o filtro de segurança, testamos o capacitor e, se necessário, fazemos a substituição no local por uma peça original robusta. Sem enrolação, direto ao ponto e devolvendo a paz para a sua lavanderia com garantia por escrito!""",
                "faqs": [
                    {"q": "O que faz a lavadora de roupas bater a água mas se recusar a centrifugar em [CITY]?", "a": "As causas mais comuns são a eletrobomba de drenagem queimada/entupida, capacitor fraco, atuador de freio danificado ou a chave micro-switch da tampa quebrada."},
                    {"q": "Quanto custa para trocar a bomba de drenagem de água da lavadora?", "a": "A troca completa da bomba de drenagem (peça original + serviço) fica em torno de R$190 a R$320, dependendo da marca da máquina de lavar."},
                    {"q": "Por que a lavadora faz barulho forte de zumbido elétrico mas o tambor não gira?", "a": "Esse zumbido elétrico indica que o motor está recebendo energia, mas está travado pela mecânica danificada ou o capacitor de partida está queimado."},
                    {"q": "O sensor da tampa (interruptor) pode impedir a centrifugação em [CITY]?", "a": "Sim! Por segurança, se a máquina entender que a tampa está aberta durante a centrifugação rápida, ela corta a energia do motor instantaneamente."},
                    {"q": "Vocês atendem lavadoras Consul e Brastemp no mesmo dia em [CITY]?", "a": "Atendemos sim! Temos estoque de peças de reposição rápida para Brastemp e Consul em nossas motos para resolver na primeira visita."},
                    {"q": "É perigoso usar a máquina de lavar se ela estiver vazando um pouco de óleo por baixo?", "a": "Muito perigoso. O vazamento de óleo ou graxa preta por baixo indica que o retentor estourou. A água vai escorrer direto no motor ou na fiação, podendo causar curto-circuito geral."},
                    {"q": "Por que a máquina de lavar fica batendo nas laterais ao tentar centrifugar?", "a": "Isso acontece devido ao desequilíbrio das roupas no cesto, amortecedores internos cansados ou tirantes de borracha rompidos. Substituímos esses tirantes com facilidade."},
                    {"q": "Vocês realizam o conserto de placa eletrônica de máquina de lavar em [CITY]?", "a": "Sim, em muitos casos conseguimos recuperar a placa original trocando apenas componentes eletrônicos queimados, barateando o serviço para o cliente."},
                    {"q": "Qual o período de garantia dos serviços de lavadoras?", "a": "Oferecemos garantia legal e contratual de 90 dias em todas as peças originais trocadas e serviços executados em [CITY]."},
                    {"q": "Vocês cobram orçamento se eu não aprovar o conserto?", "a": "Apenas cobramos a taxa de R$89 pela visita técnica caso o orçamento não seja aprovado. Se aprovar, esse valor é totalmente grátis."}
                ]
            }
        ]
        db.services.insert_many(services)
        print("Serviços de testemunho de técnico semeados com sucesso.")

    # 4. Semear Blog (Postagens dinâmicas focadas em SEO Semântico + GEO)
    if db.blog_posts.count_documents({}) == 0:
        posts = [
            {
                "title": "Por que a Geladeira Frost Free acumula água embaixo das gavetas em Sorocaba?",
                "slug": "geladeira-acumula-agua-gavetas",
                "meta_description": "Encontrou poça de água embaixo da gaveta de legumes? Saiba como desobstruir o dreno e resolver o vazamento de água interno em Sorocaba.",
                "summary": "Muitos moradores de Sorocaba se deparam com água escorrendo por dentro da geladeira, molhando tudo e estragando alimentos. O técnico Wericles explica como resolver esse entupimento de dreno de forma simples e rápida.",
                "content": """Se você mora na região de Sorocaba e arredores, já deve ter reparado que o clima quente faz a nossa geladeira trabalhar no limite quase o ano todo. E um dos problemas mais incômodos que meus clientes reclamam quando chego para atender é o famoso acúmulo de água debaixo da gaveta de verduras. A pessoa vai pegar uma alface ou um tomate e ele está boiando em uma poça de água fria e suja, com cheiro desagradável.

A explicação para isso é puramente física e muito simples de consertar quando você sabe o que está fazendo. Toda geladeira Frost Free faz um ciclo de degelo automático algumas vezes por dia. O gelo que se forma na serpentina do freezer é derretido por uma resistência elétrica e a água resultante deve escorrer por um duto pequeno chamado dreno, que leva essa água até uma bandeja que fica lá atrás, em cima do compressor (motor). O calor do motor evapora essa água naturalmente.

No entanto, com o passar do tempo, pequenos pedaços de plástico, poeira, bolores ou resíduos de alimentos que caem na calha interna acabam entupindo a saída do dreno. Como a água não consegue descer pelo caninho até o motor, ela transborda da calha interna e começa a escorrer pelas paredes de dentro da geladeira, indo parar no ponto mais baixo: debaixo da gaveta de legumes.

Para desobstruir o dreno, nós usamos uma sonda flexível especial e água morna pressurizada sob medida, limpando todo o duto sem danificar as paredes isolantes de poliuretano da geladeira. Evite usar arames rígidos ou facas, pois você pode facilmente furar a serpentina de gás ou o duto plástico, inutilizando a geladeira de forma permanente! Se notar água escorrendo, nos chame no WhatsApp para uma higienização segura e rápida no dreno!""",
                "created_at": "12 de Julho de 2026"
            },
            {
                "title": "Evite que sua Máquina de Lavar Roupa queime após picos de energia em Votorantim",
                "slug": "evitar-queimar-maquina-lavar-picos-energia",
                "meta_description": "Aprenda dicas essenciais de proteção elétrica para sua máquina de lavar ou lava e seca na região de Sorocaba e Votorantim com o técnico Valdevino.",
                "summary": "As chuvas de verão e oscilações elétricas na região de Sorocaba e Votorantim são grandes vilãs das lavadoras. O técnico Valdevino traz um alerta prático para proteger as placas do seu eletrodoméstico.",
                "content": """Aqui na região de Sorocaba, Votorantim e Salto de Pirapora, nós sofremos muito com tempestades frequentes e, consequentemente, quedas e picos de energia constantes. Como técnico com 15 anos de estrada na refrigeração, posso te dar um testemunho preocupante: quase metade das placas eletrônicas de lavadoras e geladeiras que troco foram queimadas exatamente quando a energia caiu e voltou com uma voltagem muito superior à suportada pelo circuito.

As placas eletrônicas das máquinas modernas (especialmente das digitais com painel sensível ao toque ou das Lava e Seca inversoras) são computadores miniaturizados extremamente sensíveis. Elas possuem capacitores, varistores e microprocessadores que não toleram flutuações maiores que 10% na voltagem nominal da tomada.

Aqui vão três dicas práticas do Valdevino para você proteger seu eletrodoméstico hoje mesmo e economizar centenas de reais em placas eletrônicas:

1. **Retire da tomada quando não estiver usando:** Essa é a regra de ouro! Se a máquina de lavar não estiver fazendo ciclo, tire o plugue da tomada. Uma fiação energizada durante um raio pode queimar a placa mesmo com a máquina 'desligada' no botão.
2. **Use um Protetor de Surto de Tomada (iClamper ou similar):** São pequenos adaptadores de tomada baratos que custam em torno de R$ 30 a R$ 50. Eles funcionam como um fusível inteligente: se houver uma sobretensão causada por raio ou retorno de energia da concessionária, o protetor absorve o impacto e queima a si mesmo, salvando a placa de 500 reais da sua máquina de lavar.
3. **Nivele perfeitamente os pés da máquina:** Vibrações excessivas geradas por pés desregulados fazem a fiação interna vibrar contra as chapas de metal da carcaça, o que pode descascar fios e causar curto-circuito na placa ao longo do tempo.

Se o painel da sua máquina de lavar apagou por completo e não dá nenhum sinal de vida após uma chuva, mande uma mensagem no nosso WhatsApp. Nós realizamos o diagnóstico elétrico completo em Votorantim, Sorocaba e região rápida no mesmo dia!""",
                "created_at": "12 de Julho de 2026"
            }
        ]
        db.blog_posts.insert_many(posts)
        print("Postagens do Blog semeadas com sucesso.")

# Executa o semeador automático
seed_database()

# Filtro customizado do Jinja2 para substituir "[CITY]" pelo nome real da cidade nas FAQs
@app.template_filter('replace_city')
def replace_city_filter(value, city_name):
    if not value:
        return ""
    return value.replace("[CITY]", city_name)

# --- ROTAS PÚBLICAS (Mecanismo Dinâmico de SEO Semântico + GEO) ---

@app.route('/')
def index():
    # Carrega as seções ativas do banco ordenadas por 'order'
    sections_cursor = db.sections.find({"active": True}).sort("order", 1)
    sections = {s["section_id"]: s for s in sections_cursor}
    return render_template('index.html', sections=sections, cidades=CIDADES)

@app.route('/categoria/<city_slug>/<category_slug>')
def view_category(city_slug, category_slug):
    # Encontra a cidade correspondente
    city = next((c for c in CIDADES if c["slug"] == city_slug), None)
    if not city:
        flash("Cidade não atendida por nossa equipe.", "warning")
        return redirect(url_for('index'))

    category = db.categories.find_one({"slug": category_slug})
    if not category:
        flash("Categoria de serviço não encontrada.", "danger")
        return redirect(url_for('index'))

    # Busca os serviços associados a essa categoria para exibir como links internos (SEO Semântico)
    services = list(db.services.find({"category_slug": category_slug}))

    return render_template('categoria.html', category=category, city=city, services=services, cidades=CIDADES)

@app.route('/servico/<city_slug>/<service_slug>')
def view_service(city_slug, service_slug):
    city = next((c for c in CIDADES if c["slug"] == city_slug), None)
    if not city:
        flash("Cidade não atendida por nossa equipe.", "warning")
        return redirect(url_for('index'))

    service = db.services.find_one({"slug": service_slug})
    if not service:
        flash("Serviço especializado não encontrado.", "danger")
        return redirect(url_for('index'))

    # Encontra a categoria do serviço para linkar de volta (SEO Semântico)
    category = db.categories.find_one({"slug": service["category_slug"]})

    # Carrega outros serviços para cross-linking interno
    other_services = list(db.services.find({"slug": {"$ne": service_slug}}).limit(3))

    return render_template('servico.html', service=service, city=city, category=category, other_services=other_services, cidades=CIDADES)

@app.route('/blog')
def blog_index():
    posts = list(db.blog_posts.find({}).sort("_id", -1))
    return render_template('blog_index.html', posts=posts, cidades=CIDADES)

@app.route('/blog/<post_slug>')
def blog_post(post_slug):
    post = db.blog_posts.find_one({"slug": post_slug})
    if not post:
        flash("Artigo do Blog não encontrado.", "danger")
        return redirect(url_for('blog_index'))

    # Carrega outros posts para linkagem interna
    other_posts = list(db.blog_posts.find({"slug": {"$ne": post_slug}}).limit(2))

    return render_template('blog_post.html', post=post, other_posts=other_posts, cidades=CIDADES)


# --- ROTAS DO PAINEL ADMINISTRATIVO (Session Based, Sem Controllers) ---

# Função simples para verificar se o usuário está autenticado
def is_logged_in():
    return session.get("logged_in") is True

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if is_logged_in():
        return redirect(url_for('admin_dashboard'))

    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")
        # Credenciais simples de administrador (segurança padrão)
        if username == "admin" and password == "sorocaba2026":
            session["logged_in"] = True
            flash("Bem-vindo ao Painel de Controle de Layout e Conteúdo!", "success")
            return redirect(url_for('admin_dashboard'))
        else:
            flash("Usuário ou senha incorretos.", "danger")

    return render_template('admin/login.html')

@app.route('/admin/logout')
def admin_logout():
    session.clear()
    flash("Sessão encerrada com sucesso.", "info")
    return redirect(url_for('admin_login'))

@app.route('/admin')
def admin_redirect():
    if not is_logged_in():
        return redirect(url_for('admin_login'))
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/dashboard')
def admin_dashboard():
    if not is_logged_in():
        return redirect(url_for('admin_login'))

    # Carrega contagens para exibição no painel geral
    sections_count = db.sections.count_documents({})
    categories_count = db.categories.count_documents({})
    services_count = db.services.count_documents({})
    posts_count = db.blog_posts.count_documents({})

    # Listas de cada tipo de conteúdo
    sections_list = list(db.sections.find({}).sort("order", 1))
    categories_list = list(db.categories.find({}))
    services_list = list(db.services.find({}))
    posts_list = list(db.blog_posts.find({}))

    return render_template(
        'admin/dashboard.html',
        sections_count=sections_count,
        categories_count=categories_count,
        services_count=services_count,
        posts_count=posts_count,
        sections_list=sections_list,
        categories_list=categories_list,
        services_list=services_list,
        posts_list=posts_list
    )


# --- CRUD ADMIN: LAYOUT DA HOMEPAGE ---

@app.route('/admin/layout/editar/<section_id>', methods=['GET', 'POST'])
def admin_editar_secao(section_id):
    if not is_logged_in():
        return redirect(url_for('admin_login'))

    section = db.sections.find_one({"section_id": section_id})
    if not section:
        flash("Seção de layout não encontrada.", "danger")
        return redirect(url_for('admin_dashboard'))

    if request.method == 'POST':
        # Captura os dados do formulário dinâmico correspondentes à seção do MongoDB
        updated_content = {}
        for key in section["content"].keys():
            updated_content[key] = request.form.get(key, "")

        active_status = True if request.form.get("active") == "on" else False
        order_val = int(request.form.get("order", section.get("order", 1)))

        db.sections.update_one(
            {"section_id": section_id},
            {
                "$set": {
                    "content": updated_content,
                    "active": active_status,
                    "order": order_val
                }
            }
        )
        flash(f"Seção '{section['name']}' atualizada com sucesso!", "success")
        return redirect(url_for('admin_dashboard'))

    return render_template('admin/editar_secao.html', section=section)


# --- CRUD ADMIN: CATEGORIAS ---

@app.route('/admin/categorias/nova', methods=['GET', 'POST'])
def admin_nova_categoria():
    if not is_logged_in():
        return redirect(url_for('admin_login'))

    if request.method == 'POST':
        name = request.form.get("name")
        slug = request.form.get("slug")
        meta_description = request.form.get("meta_description")
        description = request.form.get("description")

        # Captura os 10 FAQs digitados no formulário
        faqs = []
        for i in range(1, 11):
            q = request.form.get(f"faq_q_{i}", "")
            a = request.form.get(f"faq_a_{i}", "")
            if q and a:
                faqs.append({"q": q, "a": a})

        # Garante exatamente 10 FAQs preenchendo as vazias caso falte alguma para cumprir a regra de negócio do SEO
        while len(faqs) < 10:
            faqs.append({
                "q": f"Dúvida frequente {len(faqs)+1} sobre {name} em [CITY]?",
                "a": f"Nossa equipe de técnicos atende {name} em [CITY] de forma ágil com peças originais e garantia em contrato."
            })

        new_category = {
            "name": name,
            "slug": slug,
            "meta_description": meta_description,
            "description": description,
            "faqs": faqs[:10]
        }

        db.categories.insert_one(new_category)
        flash(f"Categoria '{name}' criada com sucesso!", "success")
        return redirect(url_for('admin_dashboard'))

    return render_template('admin/editar_categoria.html', category=None)

@app.route('/admin/categorias/editar/<category_id>', methods=['GET', 'POST'])
def admin_editar_categoria(category_id):
    if not is_logged_in():
        return redirect(url_for('admin_login'))

    category = db.categories.find_one({"_id": ObjectId(category_id)})
    if not category:
        flash("Categoria não encontrada.", "danger")
        return redirect(url_for('admin_dashboard'))

    if request.method == 'POST':
        name = request.form.get("name")
        slug = request.form.get("slug")
        meta_description = request.form.get("meta_description")
        description = request.form.get("description")

        faqs = []
        for i in range(1, 11):
            q = request.form.get(f"faq_q_{i}", "")
            a = request.form.get(f"faq_a_{i}", "")
            if q and a:
                faqs.append({"q": q, "a": a})

        while len(faqs) < 10:
            faqs.append({
                "q": f"Dúvida comum {len(faqs)+1} sobre {name} em [CITY]?",
                "a": f"Garantia de 90 dias descrita em contrato para {name} em [CITY]. Contate os técnicos hoje."
            })

        db.categories.update_one(
            {"_id": ObjectId(category_id)},
            {
                "$set": {
                    "name": name,
                    "slug": slug,
                    "meta_description": meta_description,
                    "description": description,
                    "faqs": faqs[:10]
                }
            }
        )
        flash(f"Categoria '{name}' atualizada com sucesso!", "success")
        return redirect(url_for('admin_dashboard'))

    return render_template('admin/editar_categoria.html', category=category)

@app.route('/admin/categorias/deletar/<category_id>')
def admin_deletar_categoria(category_id):
    if not is_logged_in():
        return redirect(url_for('admin_login'))
    db.categories.delete_one({"_id": ObjectId(category_id)})
    flash("Categoria deletada do banco de dados.", "info")
    return redirect(url_for('admin_dashboard'))


# --- CRUD ADMIN: SERVIÇOS ---

@app.route('/admin/servicos/novo', methods=['GET', 'POST'])
def admin_novo_servico():
    if not is_logged_in():
        return redirect(url_for('admin_login'))

    categories_list = list(db.categories.find({}))

    if request.method == 'POST':
        title = request.form.get("title")
        slug = request.form.get("slug")
        category_slug = request.form.get("category_slug")
        meta_description = request.form.get("meta_description")
        article = request.form.get("article")

        faqs = []
        for i in range(1, 11):
            q = request.form.get(f"faq_q_{i}", "")
            a = request.form.get(f"faq_a_{i}", "")
            if q and a:
                faqs.append({"q": q, "a": a})

        while len(faqs) < 10:
            faqs.append({
                "q": f"Conserto de {title} em [CITY] - Pergunta {len(faqs)+1}?",
                "a": f"Nossos técnicos especializados chegam em até 90 minutos em [CITY] para consertar {title} no próprio local."
            })

        new_service = {
            "title": title,
            "slug": slug,
            "category_slug": category_slug,
            "meta_description": meta_description,
            "article": article,
            "faqs": faqs[:10]
        }

        db.services.insert_one(new_service)
        flash(f"Serviço '{title}' criado com sucesso!", "success")
        return redirect(url_for('admin_dashboard'))

    return render_template('admin/editar_servico.html', service=None, categories=categories_list)

@app.route('/admin/servicos/editar/<service_id>', methods=['GET', 'POST'])
def admin_editar_servico(service_id):
    if not is_logged_in():
        return redirect(url_for('admin_login'))

    service = db.services.find_one({"_id": ObjectId(service_id)})
    if not service:
        flash("Serviço não encontrado.", "danger")
        return redirect(url_for('admin_dashboard'))

    categories_list = list(db.categories.find({}))

    if request.method == 'POST':
        title = request.form.get("title")
        slug = request.form.get("slug")
        category_slug = request.form.get("category_slug")
        meta_description = request.form.get("meta_description")
        article = request.form.get("article")

        faqs = []
        for i in range(1, 11):
            q = request.form.get(f"faq_q_{i}", "")
            a = request.form.get(f"faq_a_{i}", "")
            if q and a:
                faqs.append({"q": q, "a": a})

        while len(faqs) < 10:
            faqs.append({
                "q": f"Dúvida {len(faqs)+1} sobre {title} em [CITY]?",
                "a": f"Os profissionais Wericles e Valdevino atendem {title} em [CITY] hoje. Chame no WhatsApp."
            })

        db.services.update_one(
            {"_id": ObjectId(service_id)},
            {
                "$set": {
                    "title": title,
                    "slug": slug,
                    "category_slug": category_slug,
                    "meta_description": meta_description,
                    "article": article,
                    "faqs": faqs[:10]
                }
            }
        )
        flash(f"Serviço '{title}' atualizado com sucesso!", "success")
        return redirect(url_for('admin_dashboard'))

    return render_template('admin/editar_servico.html', service=service, categories=categories_list)

@app.route('/admin/servicos/deletar/<service_id>')
def admin_deletar_servico(service_id):
    if not is_logged_in():
        return redirect(url_for('admin_login'))
    db.services.delete_one({"_id": ObjectId(service_id)})
    flash("Serviço deletado do banco de dados.", "info")
    return redirect(url_for('admin_dashboard'))


# --- CRUD ADMIN: BLOG ---

@app.route('/admin/blog/novo', methods=['GET', 'POST'])
def admin_novo_blog():
    if not is_logged_in():
        return redirect(url_for('admin_login'))

    if request.method == 'POST':
        title = request.form.get("title")
        slug = request.form.get("slug")
        meta_description = request.form.get("meta_description")
        summary = request.form.get("summary")
        content = request.form.get("content")
        created_at = request.form.get("created_at", "12 de Julho de 2026")

        new_post = {
            "title": title,
            "slug": slug,
            "meta_description": meta_description,
            "summary": summary,
            "content": content,
            "created_at": created_at
        }

        db.blog_posts.insert_one(new_post)
        flash(f"Artigo '{title}' publicado no Blog com sucesso!", "success")
        return redirect(url_for('admin_dashboard'))

    return render_template('admin/editar_blog.html', post=None)

@app.route('/admin/blog/editar/<post_id>', methods=['GET', 'POST'])
def admin_editar_blog(post_id):
    if not is_logged_in():
        return redirect(url_for('admin_login'))

    post = db.blog_posts.find_one({"_id": ObjectId(post_id)})
    if not post:
        flash("Artigo do blog não encontrado.", "danger")
        return redirect(url_for('admin_dashboard'))

    if request.method == 'POST':
        title = request.form.get("title")
        slug = request.form.get("slug")
        meta_description = request.form.get("meta_description")
        summary = request.form.get("summary")
        content = request.form.get("content")
        created_at = request.form.get("created_at")

        db.blog_posts.update_one(
            {"_id": ObjectId(post_id)},
            {
                "$set": {
                    "title": title,
                    "slug": slug,
                    "meta_description": meta_description,
                    "summary": summary,
                    "content": content,
                    "created_at": created_at
                }
            }
        )
        flash(f"Artigo '{title}' atualizado com sucesso!", "success")
        return redirect(url_for('admin_dashboard'))

    return render_template('admin/editar_blog.html', post=post)

@app.route('/admin/blog/deletar/<post_id>')
def admin_deletar_blog(post_id):
    if not is_logged_in():
        return redirect(url_for('admin_login'))
    db.blog_posts.delete_one({"_id": ObjectId(post_id)})
    flash("Artigo do blog removido.", "info")
    return redirect(url_for('admin_dashboard'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
