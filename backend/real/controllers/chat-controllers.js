import User from '../models/User.js';
import { config } from '../config/llama-config.js';
const apiToken = process.env.AI_SECRET;
const groq = config;
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: 'User not registered OR Token malfunctioned' });
        }
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: 'user' });
        user.chats.push({ content: message, role: 'user' });
        const apiRequestJson = {
            messages: chats.map(({ content }) => ({
                role: "user", // Set role to "function" string literal
                content,
                name: 'user',
            })),
            model: 'llama3-8b-8192',
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null,
        };
        console.log('API Request JSON:', apiRequestJson);
        try {
            const chatCompletion = await groq.chat.completions.create(apiRequestJson);
            const content = chatCompletion.choices[0]?.message?.content || '';
            user.chats.push({ content, role: 'assistant' });
        }
        catch (error) {
            console.error('Error in groq.chat.completions.create:', error.response ? error.response.data : error.message);
            return res.status(500).json({ message: 'Error with Groq API', details: error.response ? error.response.data : error.message });
        }
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map