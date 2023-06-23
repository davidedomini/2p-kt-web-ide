FROM ubuntu:22.04

RUN apt update 
RUN apt install -y openjdk-18-jdk
RUN apt install -y openjdk-18-jre

COPY ./ $HOME/service2pkt/
WORKDIR $HOME/service2pkt/
RUN ./gradlew

EXPOSE 8080

CMD ./gradlew --console=plain run2pktService
