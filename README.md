# Desaio React Native - Contele

### Descrição:
Criar um aplicativo que recupere a localização do telefone em áreas de sombra e quando a conexão com a internet estiver funcionando sincronizar os pontos de localização salvos no servidor.

### Tecnologias utilizadas:
- *@react-native-community/geolocation*: Recuperar a localização do celular.
- *@react-native-community/netinfo*: Verificar se o celular possui conexão com a internet.
- *@react-navigation/native e @react-navigation/native-stack*: Navegação entre telas.
- *axios*: Chamada de API.
- *realm*: Banco de dados offline-first para armazenar a localização.
- *styled-components*: Estilização dos componentes
____
### Detalhes do funcionamento do app
- Atualização da localização: A localização do telefone é armazenada com base no tempo em segundos escolhido pelo usuário do app.

- Verificar conectividade com internet: Ao iniciar o app, iniciará a contagem em um intervalo de 3 segundos de verificação.

- Sincronizar os pontos de localização: Ao obter uma nova localização do telefone, a mesma será armazenada no realm (offline) e a cada 1 minuto, com base na conectividade com a internet, a localização é sincronizada com o servidor.

- Compartilhamento de funções e variáveis: Foi utilizados apenas os hooks padrão do React Native para realizar o compartilhamento global de funções e estado de variáveis.

____

*A porta do servidor foi alterada de 8081 para 3333 durante o desenvolvimento do app. Ao iniciar aplicativo, certifique-se de alterar a porta de acesso ao servidor o arquivo `src/services/api.ts` e rodar o comando `adb reverse tcp:PORT tcp:PORT` para que o aplicativo tenha acesso ao serviço.*

Agradeço a oportunidade e estou a disposição para conversar mais sobre a solução desenvolvida!