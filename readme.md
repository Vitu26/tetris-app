# Tetris App

## Descrição
Este é um aplicativo para jogar o clássico jogo Tetris, desenvolvido em React Native com suporte a TypeScript e Expo Go. O objetivo do projeto é recriar a experiência do Tetris com controles responsivos, persistência de pontuações e feedback ao jogador por meio de sons e animações.

---

## Tecnologias Utilizadas
- **React Native**: Desenvolvimento da interface do usuário.
- **TypeScript**: Para garantir a tipagem estática e maior segurança no código.
- **Expo Go**: Para facilitar o desenvolvimento, teste e deploy do aplicativo.
- **AsyncStorage**: Para persistência de dados localmente.
- **expo-av**: Para reprodução de sons.

---

## Funcionalidades
1. Movimentar os blocos horizontalmente.
2. Acelerar a queda dos blocos.
3. Girar os blocos.
4. Exibir a pontuação do jogador em tempo real.
5. Salvar:
   - Pontuação recorde.
   - Pontuação da última jogada.
6. Sons:
   - Tema do Tetris ao iniciar o jogo.
   - Sons ao completar linhas ou ao finalizar o jogo.
7. Interface responsiva e adaptável a diferentes dispositivos.
8. Tela final exibindo a pontuação com opção de reiniciar o jogo ou voltar ao menu inicial.

---

## Instruções para Rodar o Projeto Localmente

### Requisitos:
- Node.js (v14 ou superior)
- Expo CLI
- Git

### Passos:
1. Clone este repositório:
   ```bash
   git clone https://github.com/Vitu26/tetris-app.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd tetris-app
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o aplicativo no Expo:
   ```bash
   expo start
   ```
5. Escaneie o QR code no terminal ou abra no emulador para executar o app.

---

## Descrição da Arquitetura do Código

### Estrutura de Pastas:
```
TetrisApp/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx       # Tela inicial com opções de navegação
│   │   ├── GameScreen.tsx       # Tela principal do jogo
│   │   ├── RecordsScreen.tsx    # Tela de exibição de recordes
│   ├── utils/
│   │   ├── gameLogic.ts         # Funções relacionadas à lógica do jogo (colisão, geração de blocos, etc.)
│   │   ├── storageUtils.ts      # Funções para salvação e recuperação de dados
│   ├── assets/
│       ├── sounds/              # Sons utilizados no jogo
│   ├── App.tsx                  # Arquivo principal do aplicativo
├── package.json                 # Configurações do projeto
```

### Ponto-chave:
O projeto segue uma arquitetura modular, com:
- **Lógica centralizada:** Toda a lógica de jogo é gerida no arquivo `gameLogic.ts` para reutilização e organização.
- **Componentização:** Cada tela possui sua própria responsabilidade clara, permitindo maior manutenção e escalabilidade.
- **Persistência:** Utiliza o AsyncStorage para salvar pontuações localmente, garantindo que os dados persistam entre sessões.

---

## Apresentação para Recrutadores

### Destaques do Código:
1. **Lógica do Jogo:**
   - Geração aleatória de blocos.
   - Detecção de colisões.
   - Preenchimento de linhas e cálculo de pontuação.

2. **Interface do Usuário:**
   - Utiliza o `LinearGradient` para criar fundos modernos e agradáveis.
   - Controles táteis responsivos para movimentar, girar e acelerar os blocos.

3. **Persistência de Dados:**
   - Armazena a maior pontuação e a pontuação da última partida utilizando AsyncStorage.

4. **Feedback ao Jogador:**
   - Sons personalizados ao completar linhas ou perder o jogo.
   - Tela de game over clara e interativa, com opções de reiniciar ou voltar ao menu inicial.

5. **Qualidade do Código:**
   - Uso de TypeScript para garantir segurança e manutenção.
   - Estrutura modular que facilita a compreensão e extensão do projeto.

### Sugestões para Apresentação:
- Explique como a lógica do Tetris foi implementada.
- Destaque o uso do AsyncStorage e sons personalizados para enriquecer a experiência do jogador.
- Demonstre o funcionamento do aplicativo em diferentes dispositivos para evidenciar a responsividade.
- Mostre a organização do código e explique como a separação por responsabilidades facilita a manutenção e o crescimento do projeto.

---

## Como Testar o Projeto
1. Execute o projeto seguindo as [Instruções para rodar o projeto localmente](#instruções-para-rodar-o-projeto-localmente).
2. Teste os seguintes cenários:
   - Movimente os blocos usando os botões na interface.
   - Complete uma linha e verifique se a pontuação é atualizada.
   - Finalize o jogo para verificar se a tela de game over é exibida corretamente.
   - Navegue até a tela de recordes para confirmar a persistência dos dados.

---

## Links Importantes
- Repositório do projeto: [GitHub](https://github.com/Vitu26/tetris-app)

