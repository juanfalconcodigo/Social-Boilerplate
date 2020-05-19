const PORT=Number(process.env.PORT)||4203;
const SECRET_KEY=process.env.SECRET_KEY_PROD || "SECRET_KEY_LOCAL";

export{
    PORT,
    SECRET_KEY
}