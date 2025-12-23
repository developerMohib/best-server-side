"use strict";
// Create a Schema corresponding to the document interface.
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
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../app/config"));
// sub schema for user name
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        minlength: [2, 'First name minimum length 2'],
        maxlength: [20, 'First name maximun length 20 charecters'],
        validate: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: '{VALUE} is not capitalize format',
        },
    },
    midName: {
        type: String,
        trim: true,
        maxlength: [20, 'Middle name maximum length 20 charecters'],
    },
    lastName: {
        type: String,
        trim: true,
        require: [true, 'Last Name is required'],
        maxlength: [20, 'First name maximun length 20 charecters'],
    },
});
// sub schema for guardian
const guardianSchema = new mongoose_1.Schema({
    fatherContactNo: {
        type: String,
        trim: true,
        require: [true, 'Father Contact Number is required'],
        match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
        unique: true,
    },
    fatherProffession: {
        type: String,
        trim: true,
        require: true,
        capitalize: {
            validator: function (value) {
                const fatherProfStr = value.charAt(0).toUpperCase() + value.slice(1);
                return fatherProfStr === value;
            },
            message: '{VALUE} is not capitalize format',
        },
    },
    fatherName: {
        type: String,
        trim: true,
        require: true,
        capitalize: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: '{VALUE} is not capitalize format',
        },
    },
    motherContactNo: {
        type: String,
        match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
        unique: true,
    },
    motherName: {
        type: String,
        require: true,
        trim: true,
        capitalize: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: '{VALUE} is not capitalize format',
        },
    },
    motherProffession: { type: String, require: true, trim: true },
});
// sub schema for local guardian
const localGuardianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        capitalize: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: '{VALUE} is not capitalize format',
        },
    },
    occufassion: {
        type: String,
        require: true,
        capitalize: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: '{VALUE} is not capitalize format',
        },
    },
    contact: {
        type: String,
        require: [true, 'Contact is required'],
        match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
        trim: true,
    },
    address: { type: String, require: true, trim: true },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        trim: true,
        required: [true, 'id is mandatory'],
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is mandatory'],
    },
    name: {
        type: userSchema,
        trim: true,
        required: [true, 'name is required to give'],
        capitalize: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: '{VALUE} is not capitalize format',
        },
    },
    email: {
        type: String,
        required: [true, 'Provide a valid email'],
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        unique: true,
        trim: true,
    },
    image: { type: String, trim: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    birthDate: String,
    contactNo: {
        type: String,
        require: [true, 'Contact is required'],
        match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
        unique: true,
    },
    emargancyContactNo: {
        type: String,
        require: [true, 'Contact is required'],
        match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
        unique: true,
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    permanentAddres: { type: String, trim: true },
    presentAddres: { type: String, trim: true },
    active: { type: String, enum: ['active', 'blocked'], default: 'active' },
    guardian: guardianSchema,
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Need to provide your guardian details'],
    },
    isDeleted: { type: Boolean, default: false },
}, {
    toJSON: { virtuals: true },
});
// mongoose middleware in useing before working data in database,
// pre save user password with hash to db
studentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        // user.password = await bcrypt.hash(user.password, Number(config.solt_rounds));
        // next();
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.solt_rounds));
        next();
    });
});
// after saving data password will be empty to user
studentSchema.post('save', function (document, next) {
    document.password = '';
    next();
});
// pre delete user from db,just isDeleted status true
studentSchema.pre('find', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
// pre delete user from db,just isDeleted status true
studentSchema.pre('aggregate', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const pipeline = this.pipeline();
        pipeline.unshift({ $match: { isDeleted: { $ne: true } } });
    });
});
// pre some field
studentSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.midName} ${this.name.lastName} `;
});
// custom method
studentSchema.methods.isExistStudent = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingStudent = yield exports.Student.findOne({ id });
        return existingStudent;
    });
};
// 3. Create a Model.
exports.Student = (0, mongoose_1.model)('Student', studentSchema);
