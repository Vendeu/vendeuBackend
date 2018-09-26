const axios =  require('axios')

const token = new Buffer("LON8YSA7HF1HT8O7UZMDEVZT8UQV9EFG:TUSLE55MOIOJO2FXE8G9AD88M53F2NU5OZFG1LRV").toString('base64')

var config = {
    headers: {
        "Authorization": "Basic " + token,
        "Content-Type": "application/json"
    }
};

const order = {
    "ownId": "pedido_4",
    "amount": {
      "currency": "BRL",
      "subtotals": {
        "shipping": 1000
      }
    },
    "items": [
      {
        "product": "Descrição do pedido",
        "quantity": 1,
        "detail": "Mais info...",
        "price": 1000
      }
    ],
    "customer": {
      "ownId": "id_3326",
      "fullname": "João Henrique",
      "email": "jose_silva0@email.com",
      "birthDate": "1988-12-30",
      "taxDocument": {
        "type": "CPF",
        "number": "22222222222"
      },
      "phone": {
        "countryCode": "55",
        "areaCode": "11",
        "number": "66778899"
      },
      "shippingAddress": {
        "street": "Avenida Faria Lima",
        "streetNumber": 2927,
        "complement": 8,
        "district": "Itaim",
        "city": "Sao Paulo",
        "state": "SP",
        "country": "BRA",
        "zipCode": "01234000"
      }
    }
  }

const payment = {
    "fundingInstrument": {
          "method": "BOLETO",
          "boleto": {
              "expirationDate": "2017-09-30",
              "instructionLines": {
                  "first": "Primeira linha de instrução teste",
                  "second": "Segunda linha de instrução teste",
                  "third": "Terceira linha de instrução teste"
              }
          }
      }
  }

module.exports = {

    addOrder: (req, res) => {
        axios.post(`https://sandbox.moip.com.br/v2/orders`, order, config)
            .then(response => {
                res.json(response.data)
            })
            .catch(err => {
                res.json(err)
            })
    },

    findOrder: (req, res) => {
        const orderId = req.params.orderId
        axios.get(`https://sandbox.moip.com.br/v2/orders/${orderId}`, config)
            .then(response => {
                res.json(response.data)
            })
            .catch(err => {
                res.json(err)
            })
    },

    findAllOrders: (req, res) => {
        axios.get(`https://sandbox.moip.com.br/v2/orders`, config)
            .then(response => {
                res.json(response.data)
            })
            .catch(err => {
                res.json(err)
            })
    },

    createPay: (req, res) => {
        const orderId = req.params.orderId;
        axios.post(`https://sandbox.moip.com.br/v2/orders/${orderId}/payments`,payment ,config)
            .then(response => {
                res.json(response.data)
            })
            .catch(err => {
                res.json(err)
            })
    },

    addMultiOrder: (req, res) => {
        axios.post(`https://sandbox.moip.com.br/v2/multiorders`, multiOrder, config)
            .then(response => {
                res.json(response.data)
            })
            .catch(err => {
                res.json(err)
            })
    }
}