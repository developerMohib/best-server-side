"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const student_routes_1 = require("./modules/students/student.routes");
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes here
// middle wares
const someData = (req, res, next) => {
    try {
        console.log('Yea habibi come to bd', req.hostname);
        next();
    }
    catch (error) {
        next(error);
    }
};
app.get('/test', someData, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('post data send practice');
}));
// my routes
app.use('/api/v1', student_routes_1.studentRoutes);
app.get('/', (req, res) => {
    res.send('Best Practice server!');
});
// global route error handler
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route not found',
    });
});
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: 'Server something went wrong',
        });
    }
    next();
});
exports.default = app;
