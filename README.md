# ToolControl

O **ToolControl** foi desenvolvido como projeto do curso de **Análise e Desenvolvimento de Sistemas (ADS)** do **SENAI**.  
A proposta é apresentar uma solução simples para controle de estoque de ferramentas, aplicando organização arquitetural, padronização e boas práticas dentro de um escopo cotidiano.

O sistema demonstra como funcionalidades básicas podem ser estruturadas de forma clara, estável e tecnicamente consistente.

---

## Visão Geral

O sistema é organizado em três módulos centrais:

### Autenticação  
Fluxo direto de login, com validações objetivas e tratamento essencial de erros.

### Tela Principal  
Exibição do usuário autenticado e acesso às funcionalidades principais.

### Produtos e Estoque  
Cadastro, edição e exclusão de ferramentas, busca rápida, movimentações de entrada e saída e controle de estoque mínimo.

A implementação busca equilíbrio entre simplicidade e estrutura técnica.

---

## Tecnologias Utilizadas

### **Frontend**
- React  
- TypeScript  
- TailwindCSS  

### **Backend**
- Node.js  
- TypeScript  
- Express  
- MySQL  

---

## Arquitetura do Sistema

A organização do projeto segue princípios de **Clean Architecture** e conceitos de **DDD**, aplicados de forma proporcional ao escopo acadêmico.

A estrutura inclui:

- Módulo de autenticação  
- Módulo de produtos  
- Gestão de estoque  
- Serviços centrais  
- Conexão com banco de dados  
- Casos de uso segmentados por responsabilidade  

Essa divisão favorece clareza, manutenção e entendimento do fluxo interno.

---

## Principais Funcionalidades

- Cadastro, edição e exclusão de produtos  
- Listagem automática ao carregar o módulo  
- Busca rápida por nome ou termo  
- Registro de entradas e saídas com data  
- Alerta automático de estoque mínimo  
- Campos para detalhes técnicos das ferramentas  
