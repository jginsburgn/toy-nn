FROM nikolaik/python-nodejs:latest

WORKDIR /root

COPY static ./static
COPY main.py package.json package-lock.json requirements.txt server.js trained.hdf5 ./
RUN pip install -r requirements.txt
RUN npm install

EXPOSE 3000

CMD node server.js