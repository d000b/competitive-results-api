FROM node:19.4.0

RUN apt update

WORKDIR /app

RUN groupadd -r group_container_builder && \
     useradd -r container_builder -g group_container_builder

RUN npm install \
     express \
     axios \
     cheerio

COPY . .


EXPOSE 8080

ENTRYPOINT [ "node" ]
CMD ["index.js"]
