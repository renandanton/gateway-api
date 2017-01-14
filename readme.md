# CGS GATEWAY API

This is a restful api for provide database operations for another apis.

## Descrpition

The CGS Gateway is a project that is developing by e-Motion and consists to abstract direct request in database instead all micro services dispatch a request for api gateway provide database informations and operations.

## Requeriments

You need install this softwares in your computer.

    $ node v6.6.0

    $ npm 3.10.3

    $ git client

    $ redis

I suggest you use [docker](https://docs.docker.com/engine/installation/) and [docker-composer](https://docs.docker.com/compose/install/) with this image [redis](https://hub.docker.com/r/library/redis/)

    $ docker pull redis

## Installation

Clone the repository project:

    $ git clone git@bitbucket.org:erik-borges/cgs-gateway.git

Enter in project directory,

    $ cd cgs-gateway

And then execute:

    $ npm install

Now, create database and run the migrations into database:

    $ npm run migrate

and finally run the web server:

    $ npm start

## How to use

Api gateway provide routes to access database operations using http verbs based in rest design:

| SQL Operation | Verb     | Route                  |
| :-----------: |:--------:| :---------------------:|
| QUERY         | POST     |  /cgs/gateway/_search  |
| INSERT        | POST     |  /cgs/gateway/_insert  |
| UPDATE        | PUT      |  /cgs/gateway/_update  |
| DELETE        | DELETE   |  /cgs/gateway/_delete  |

Insert records in database table via api gateway:

``` curl
curl -H "Content-Type: application/json" -X POST -d '{"insert": {"table": "users","into": ["name","msisdn","password","email","role_id","language_id"],"values": [["Renan","13213232","ADAFDSFA3923AS232112334",	"renan@teste.com.br",1,1], ["Jessyca","78968965","OI32O34PI23JO3KLIOJ","jessyca@teste.com.br",2,2]	]}}' http://localhost:3000/cgs/gateway/_insert
```

Json body data example:

``` json
{
	"insert": {
		"table": "table0",
		"into": [
			"column0",
			"column1",
			"column2",
			"column3",
			"column4",
			"column5"
		],
		"values": [
			[
				"value1",
				"value2",
				"value3",
				"value4",
				1,
				2

			],
			[
				"value1",
				"value2",
				"value3",
				"value4",
				3,
				2
			]
		]
	}
}
```
Update records in database table via api gateway:

``` curl
curl -H "Content-Type: application/json" -X PUT -d  '{"update": {"table": "users","set": {"name": "Renan Danton de souza XXX","msisdn": "13213232","password": "123456789","email": "renandanton@teste.com.br","role_id": 1,"language_id": 2},"where": {"id": 30}}}'  http://localhost:3000/cgs/gateway/_update
```

Json body data example:

``` json
{
	"update": {
		"table": "table0",
		"set": {
			"field1": "value1",
			"field2": "value2",
			"field3": "value3",
			"field4": "value4@teste.com.br",
			"field5": 1,
			"field6": 2
		},
		"where": {
			"id": 30
		}
	}
}
```

Delete records in database table via api gateway:

``` curl
curl -H "Content-Type: application/json" -X DELETE -d '{"delete": {"from": "users","where": {"id": 41}}}' http://localhost:3000/cgs/gateway/_delete
```

Json body data example:

``` json
{
	"delete": {
		"from": "users",
		"where": {
			"id": 47
		}
	}
}
```


Do queries in api gateway:

```curl
curl -H "Content-Type: application/json" -X POST -d  '{"query": {"select": ["name","email","created_at","updated_at"], "from": "users","where": {"id": 10}}}' http://localhost:3000/cgs/gateway/_search
```

Json body data example:

``` json
{   
    "query": {
        "select": [
            "name",
            "email",
            "created_at",
            "updated_at"
        ],
        "from": "table0",
        "where": {
            "id": 30
        }
    }
}
```

Creating JSQL using  ***inner joins***:

```json
{
	"query": {
		"select": [
			"u.name as nome",
			"u.msisdn as telefone",
			"p.photo as foto",
			"mt.meta as objetivo"
		],
		"from": "users as u",
		"joins": [
			{
				"profiles as p": {
					"on": "p.user_id=u.id"
				}
			},
			{
				"metas as mt": {
					"on": "mt.id=p.meta_id"
				}
			}
		]
	}
}
```
Creating JSQL using  ***group by*** and ***having***:

``` json
{
	"query": {
		"select": [
			"r.name as role",
			"count(u.id) as total_role"
		],
		"from": "users as u",
		"joins": [
			{
				"roles as r": {
					"on": "r.id=u.role_id"
				}
			}
		],
		"group": [
			"u.role_id"
		],
		"having": {
			"gte": {
				"count(u.id)": 6
			}
		}
	}
}
```

For disable caching in a single request, you must send a property in header called ***cached*** with value equals to ***false*** like this:

```curl
curl -H "Content-Type: application/json" -H "cached: false" -X POST -d  '{"query": {"select": ["name","email","created_at","updated_at"], "from": "users","where": {"id": 10}}}' http://localhost:3000/cgs/gateway/_search
```

## Other Infos

 Workbench Model [MacroSky.mwb](https://drive.google.com/open?id=0B9gPInimLaMUdlVLZWlxQ09mZE0)

## Copyright

This is a private repository under emotion [copyright](http://emotion.digital/).
