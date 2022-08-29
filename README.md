<p align="center"><a href="https://devsarfo.io" target="_blank"><img src="https://devsarfo.io/assets/images/myphoto.jpg" width="250"></a></p>

# Survey API 
RESTful API with Node.js, Express &amp; TypeScript

## Introduction
Welcome to the Jodel Tech Challenge. Glad you made it this far! We are very excited to learn more about you.

The main goal of this exercise is to assess your approach to problem-solving, as well as your ability to write clean, well-tested, and reusable code. There are no trick questions or algorithms to solve.

## The Task
Build an API that enables the creation and taking of user surveys. Your application should be written in Node.js (JavaScript or TypeScript).

## General
- Please include a README file with instructions on how to run your application.
- You can use any library or framework you want.
- Think about the requirements towards your app when it comes to deploying it to production.
- We hope you are having some fun as well!

## Specifications
A survey should consist of:
- A question
- 2 or more possible answers to choose from

Example of a survey:
-  Question: What is your favorite color?
- Possible answers: Blue, Green, Red, Yellow

Your API should support the following operations:
- Creating a survey
- Answering to a survey by choosing an answer
- Retrieving the results of a survey
- No frontend is needed and any submitted will not be part of the review.

Data Persistence
-- You will need to persist the data in some way.
-- You do not need to use a datastore external to your application. Still, you should be able to explain how you would integrate a real database into your application

### How to build
To get the server server running locally:

- Clone this repo
- npm install to install all required dependencies
- npm run dev to start the local server

---

### Testing the API

- ContentType:  **application/json** 
- Base URL: **http://localhost:3000**

---

####  Create survey

Endpoint: **POST  /survey**

The API handles validation to ensure that
- Title is required
- At least question is required
- 2 or more possible answers to choose from

The payload should be in json as shown below
- title
- questions [ array of question and answers ] 

``` json
{
    "title": "Survey 1",
    "questions": [
        {
            "question": "What is your favorite country?",
            "answers": ["Germany", "Ghana", "USA"]
        },
        {
            "question": "What is your favorite football club?",
            "answers": ["Chelsea", "Manchester United"]
        },
        {
            "question": "What is your favorite colour?",
            "answers": ["Blue", "Green", "Red", "Yellow"]
        },
        {
            "question": "Do you want to confirm answers?",
            "answers": ["Yes", "No", "Maybe"]
        }
    ]
}
```

**Success Response**
``` json
{
    "status": "success",
    "message": "Survey Created Successfully",
    "survey": {
        "status": "success",
        "data": {
            "id": "114cbb63-84dd-437e-9f9f-add560186438",
            "title": "Survey 1",
            "questions": [
                {
                    "id": "514def88-a003-4981-be16-b5558092eaf7",
                    "question": "What is your favorite country?",
                    "answers": [
                        "Germany",
                        "Ghana",
                        "USA"
                    ]
                },
                {
                    "id": "145df87c-d68a-4dff-a464-c07299ddf73a",
                    "question": "What is your favorite football club?",
                    "answers": [
                        "Chelsea",
                        "Manchester United"
                    ]
                },
                {
                    "id": "73d6b3c9-972d-48ae-bed4-3cfd74703fa9",
                    "question": "Do you want to confirm answers?",
                    "answers": [
                        "Yes",
                        "No",
                        "Maybe"
                    ]
                }
            ],
            "createdAt": "2022-08-29 17:57:05"
        }
    }
}
```

**Error response**
``` json
{
    "status": "error",
    "fields": [
        {
            "value": [
                {
                    "question": "What is your favorite country?",
                    "answers": [
                        "Germany",
                        "Ghana",
                        "USA"
                    ]
                },
                {
                    "question": "What is your favorite football club?",
                    "answers": [
                        "Chelsea",
                        "Manchester United"
                    ]
                },
                {
                    "question": "Do you want to confirm answers?",
                    "answers": ""
                }
            ],
            "msg": [
                "Question: \"Do you want to confirm answers?\" requires 2 or more possible answers to choose from"
            ],
            "param": "questions",
            "location": "body"
        }
    ]
}
```


---

####  List Surveys

Endpoint: **GET /survey**

**Success Response**
``` json
{
    "status": "success",
    "message": "Surveys Loaded Successfully",
    "surveys": [
        {
            "id": "114cbb63-84dd-437e-9f9f-add560186438",
            "title": "Survey 1",
            "questions": [
                {
                    "id": "d42813bd-2e1c-494a-90c9-8b122d06366c",
                    "question": "What is your favorite country?",
                    "answers": [
                        "Germany",
                        "Ghana",
                        "USA"
                    ]
                },
                {
                    "id": "145df87c-d68a-4dff-a464-c07299ddf73a",
                    "question": "What is your favorite football club?",
                    "answers": [
                        "Chelsea",
                        "Manchester United"
                    ]
                },
                {
                    "id": "73d6b3c9-972d-48ae-bed4-3cfd74703fa9",
                    "question": "Do you want to confirm answers?",
                    "answers": [
                        "Yes",
                        "No",
                        "Maybe"
                    ]
                }
            ],
            "createdAt": "2022-08-29 18:09:11"
        }
    ]
}
```

---

####  Get Survey By Id

Endpoint: **GET /survey/:id**

**Success Response**
``` json
{
    "status": "success",
    "message": "Survey Loaded Successfully",
    "survey": {
        "id": "114cbb63-84dd-437e-9f9f-add560186438",
        "title": "Survey 1",
        "questions": [
            {
                "id": "d42813bd-2e1c-494a-90c9-8b122d06366c",
                "question": "What is your favorite country?",
                "answers": [
                    "Germany",
                    "Ghana",
                    "USA"
                ]
            },
            {
                "id": "145df87c-d68a-4dff-a464-c07299ddf73a",
                "question": "What is your favorite football club?",
                "answers": [
                    "Chelsea",
                    "Manchester United"
                ]
            },
            {
                "id": "73d6b3c9-972d-48ae-bed4-3cfd74703fa9",
                "question": "Do you want to confirm answers?",
                "answers": [
                    "Yes",
                    "No",
                    "Maybe"
                ]
            }
        ],
        "createdAt": "2022-08-29 18:09:11"
    }
}
```

**Error response**
``` json
{
    "status": "error",
    "message": "Survey with id: 114cbb63-84dd-437e-9f9f-add560186438ss not found"
}
```

---

####  Update Survey By Id

Endpoint: **PATCH /survey/:id**

The API handles validation to ensure that
- Title is required
- At least question is required
- 2 or more possible answers to choose from

The payload should be in json as shown below
- title
- questions [ array of question and answers ] 


``` json
{
    "title": "Country Survey",
    "questions": [
        {
            "id": "d42813bd-2e1c-494a-90c9-8b122d06366c",
            "question": "What is your favorite colour?",
            "answers": [
                "Blue",
                "Green",
                "Red",
                "Yellow"
            ]
        }
    ]
}
```

**Success Response**
``` json
{
    "status": "success",
    "message": "Survey Updated Successfully",
    "survey": {
        "id": "114cbb63-84dd-437e-9f9f-add560186438",
        "title": "Country Survey",
        "questions": [
            {
                "id": "d42813bd-2e1c-494a-90c9-8b122d06366c",
                "question": "What is your favorite colour?",
                "answers": [
                    "Blue",
                    "Green",
                    "Red",
                    "Yellow"
                ]
            }
        ],
        "createdAt": "2022-08-29 18:09:11",
        "updatedAt": "2022-08-29 18:28:15"
    }
}
```

**Error response**
``` json
{
    "status": "error",
    "message": "Survey with id: 114cbb63-84dd-437e-9f9f-add560186438ss not found"
}
```

####  Delete Survey By Id

Endpoint: **DELETE /survey/:id**

**Success Response**
``` json
{
    "status": "success",
    "message": "Survey Deleted Successfully"
}
```

**Error response**
``` json
{
    "status": "error",
    "message": "Survey with id: 114cbb63-84dd-437e-9f9f-add560186438ss not found"
}
```

---


####  Answer Survey By Id

Endpoint: **POST /survey/:id/answer**

The API handles validation to ensure that
- Survey Id is required
- Question Id is required
- An VALID answer from 1 or more possible answers to choose from
- **NB**: If answer doesn't match list of answers, it will return error

The payload should be in json as shown below
- answers [ array of question ids and answers ] 

``` json
{
    "answers": [
        {
            "questionId": "d42813bd-2e1c-494a-90c9-8b122d06366c",
            "answer": "Ghana"
        },
        {
            "questionId": "145df87c-d68a-4dff-a464-c07299ddf73a",
            "question": "What is your favorite football club?",
            "answer": "Chelsea"
        },
        {
            "questionId": "73d6b3c9-972d-48ae-bed4-3cfd74703fa9",
            "question": "Do you want to confirm answers?",
            "answer":  "Yes"
        }
    ]
}
```

**Success Response**
``` json
{
    "status": "success",
    "message": "Survey Answered Successfully",
    "response": {
        "id": "2de5382e-e3e3-4549-93ca-20460e9fd9f8",
        "surveyId": "114cbb63-84dd-437e-9f9f-add560186438",
        "answers": [
            {
                "questionId": "d42813bd-2e1c-494a-90c9-8b122d06366c",
                "answer": "Ghana"
            },
            {
                "questionId": "145df87c-d68a-4dff-a464-c07299ddf73a",
                "answer": "Chelsea"
            },
            {
                "questionId": "73d6b3c9-972d-48ae-bed4-3cfd74703fa9",
                "answer": "Yes"
            }
        ],
        "createdAt": "2022-08-29 18:33:38"
    }
}
```

**Error response**
``` json
{
    "status": "error",
    "fields": [
        {
            "value": [
                {
                    "question": "What is your favorite country?",
                    "answers": [
                        "Germany",
                        "Ghana",
                        "USA"
                    ]
                },
                {
                    "question": "What is your favorite football club?",
                    "answers": [
                        "Chelsea",
                        "Manchester United"
                    ]
                },
                {
                    "question": "Do you want to confirm answers?",
                    "answers": ""
                }
            ],
            "msg": [
                "Question: \"Do you want to confirm answers?\" requires 2 or more possible answers to choose from"
            ],
            "param": "questions",
            "location": "body"
        }
    ]
}
```

---


####  Get Survey Results By Id

Endpoint: **GET /survey/:id/results**

**Success Response**
``` json
{
    "status": "success",
    "message": "Survey Results Loaded Successfully",
    "results": [
        {
            "question": "What is your favorite country?",
            "results": [
                {
                    "Germany": 0
                },
                {
                    "Ghana": 2
                },
                {
                    "USA": 0
                }
            ]
        },
        {
            "question": "What is your favorite football club?",
            "results": [
                {
                    "Chelsea": 2
                },
                {
                    "Manchester United": 0
                }
            ]
        },
        {
            "question": "Do you want to confirm answers?",
            "results": [
                {
                    "Yes": 1
                },
                {
                    "No": 1
                },
                {
                    "Maybe": 0
                }
            ]
        }
    ]
}
```

**Error response**
``` json
{
    "status": "error",
    "message": "Survey with id: 114cbb63-84dd-437e-9f9f-add560186438ss not found"
}
```

---
