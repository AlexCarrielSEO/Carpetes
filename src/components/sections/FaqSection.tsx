import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FaqItem[];
  className?: string;
}

const FaqSection: React.FC<FaqSectionProps> = ({
  title = "Perguntas Frequentes",
  subtitle = "Encontre respostas para as perguntas mais comuns sobre nossos serviços de carpetes personalizados.",
  faqs = [
    {
      question: "Quais tipos de carpetes personalizados vocês oferecem?",
      answer:
        "Oferecemos uma ampla gama de carpetes personalizados, incluindo residenciais, comerciais, tecidos à mão, feitos à máquina, de lã, sintéticos e opções ecológicas. Nossa equipe de design pode ajudá-lo a selecionar o carpete perfeito com base em suas necessidades e preferências específicas.",
    },
    {
      question: "Quanto tempo leva o processo de carpete personalizado?",
      answer:
        "O cronograma para carpetes personalizados varia dependendo da complexidade do design, tamanho e materiais. Normalmente, nosso processo leva de 4 a 8 semanas desde a consulta inicial até a instalação. Forneceremos um cronograma mais preciso durante sua consulta.",
    },
    {
      question: "Vocês fornecem serviços de instalação?",
      answer:
        "Sim, fornecemos serviços de instalação profissional para todos os nossos carpetes personalizados. Nossos instaladores experientes garantem o ajuste e posicionamento adequados para maximizar a vida útil e a aparência do seu carpete.",
    },
    {
      question: "Qual é a estrutura de preços para carpetes personalizados?",
      answer:
        "Nossos preços são baseados em vários fatores, incluindo tamanho, material, complexidade do design e requisitos de instalação. Oferecemos opções para vários orçamentos e fornecemos orçamentos detalhados após a consulta inicial.",
    },
    {
      question: "Como cuidar e manter meu carpete personalizado?",
      answer:
        "Fornecemos instruções detalhadas de cuidados específicos para o tipo do seu carpete. Geralmente, aspiração regular, tratamento imediato de manchas e limpeza profissional a cada 12-18 meses manterão seu carpete com a melhor aparência. Também oferecemos serviços de manutenção e podemos recomendar produtos de limpeza apropriados.",
    },
    {
      question: "Vocês oferecem garantias em seus carpetes personalizados?",
      answer:
        "Sim, todos os nossos carpetes personalizados vêm com garantia do fabricante. Além disso, oferecemos nossa própria garantia de artesanato na instalação. Os termos específicos variam por produto, e forneceremos informações detalhadas de garantia com sua compra.",
    },
  ],
  className = "",
}) => {
  return (
    <section className={`py-16 px-4 md:px-8 bg-gray-50 ${className}`}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Perguntas Comuns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-gray-600 pt-2">{faq.answer}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">Ainda tem dúvidas?</p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Contate-nos
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
