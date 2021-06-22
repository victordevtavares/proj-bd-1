# Proj BD 1

Um CRUD para controle de matrículas de alunos, com importação de CSV. Projeto em HTML + Javascript + CSS, NodeJS and MySQL rodando em Docker.

Para subir o ambiente, execute o comando ***docker-compose up*** na pasta raiz do projeto. 

Para subí-lo a primeira vez, você deverá aguardar a mensagem de MySQL Server is ready for connection e então restartar o container do node com ***docker-compose restart node***

## Resolução de problemas:
### Node container crash
    node     | standard_init_linux.go:228: exec user process caused: no such file or directory

    Modificar o tipo do arquivo docker-config\node\start_application.sh de CRLF para LF.
    https://stackoverflow.com/a/60571147/10291492
