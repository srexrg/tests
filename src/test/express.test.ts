import { describe, expect, it, vi } from 'vitest';
import request from "supertest";
import { app } from "../index"
import { prismaclient } from '../db';

vi.mock("../db")

describe("arithmetic operations", () => {
    describe("sum", () => {
        it("should add two positive numbers", async () => {
            const res = await request(app).post("/sum").send({ a: 5, b: 3 });
            expect(res.statusCode).toBe(200);
            expect(res.body.sum).toBe(8);
        });

        it("should handle negative numbers", async () => {
            const res = await request(app).post("/sum").send({ a: -5, b: 3 });
            expect(res.statusCode).toBe(200);
            expect(res.body.sum).toBe(-2);
        });
    });

    describe("subtraction", () => {
        it("should reject when a > b", async () => {
            const res = await request(app).post("/sub").send({ a: 5, b: 3 });
            expect(res.statusCode).toBe(422);
            expect(res.body.message).toBe("sorry");
        });

        it("should reject negative numbers", async () => {
            const res = await request(app).post("/sub").send({ a: -5, b: 3 });
            expect(res.statusCode).toBe(422);
            expect(res.body.message).toBe("sorry");
        });

        it("should subtract valid numbers", async () => {
            const res = await request(app).post("/sub").send({ a: 3, b: 5 });
            expect(res.statusCode).toBe(200);
            expect(res.body.sub).toBe(-2);
        });
    });

    describe("multiplication", () => {
        it("should multiply two positive numbers", async () => {
            const res = await request(app).post("/mul").send({ a: 4, b: 3 });
            expect(res.statusCode).toBe(200);
            expect(res.body.mul).toBe(12);
        });

        it("should handle zero", async () => {
            const res = await request(app).post("/mul").send({ a: 5, b: 0 });
            expect(res.statusCode).toBe(200);
            expect(res.body.mul).toBe(0);
        });
    });

    describe("division", () => {
        it("should reject negative numbers", async () => {
            const res = await request(app).post("/div").send({ a: -6, b: 2 });
            expect(res.statusCode).toBe(422);
            expect(res.body.message).toBe("sorry");
        });

        it("should divide valid numbers", async () => {
            const res = await request(app).post("/div").send({ a: 6, b: 2 });
            expect(res.statusCode).toBe(200);
            expect(res.body.div).toBe(3);
        });

        it("should handle decimal results", async () => {
            const res = await request(app).post("/div").send({ a: 5, b: 2 });
            expect(res.statusCode).toBe(200);
            expect(res.body.div).toBe(2.5);
        });
    });
});