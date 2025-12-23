# 🎓 Student Management API

A simple **Student Management REST API** built with **Node.js, Express, and TypeScript**.  
This project follows a clean, modular structure using controllers and routes.

---

## 🚀 Features

- Create a student
- Get all students
- Get a single student by ID
- Update a student
- Delete a student
- TypeScript support
- Modular folder structure

---

## 🗂 Project Structure

```bash
root
├── src
│   ├── server.ts
│   └── modules
│       └── student
│           ├── student.controller.ts
│           └── student.route.ts
├── dist
│   └── server.js
├── package.json
├── tsconfig.json
└── README.md


📌 Notice
The main entry file has been renamed:

index.ts → server.ts

Source file: src/server.ts

Build file: dist/server.js

```
- router.post('/create-student', createStudent);
- router.get('/get-students', getAllStudents);
- router.get('/get-student/:id', getASingleStudent);
- router.delete('/get-student/:id', deleteStudent);
- router.put('/get-student/:id', updateStudent);
```

🛠 Tech Stack

Node.js

Express.js

TypeScript

Nodemon

ts-node


---

If you want, I can also:
- Rename routes to **REST standard** (`/students`)
- Add **.env example**
- Add **MongoDB / Mongoose section**
- Make it **interview-ready README**

Just say the word 🚀
