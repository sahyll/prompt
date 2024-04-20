// GET (reAD)
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {
    try{
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response ("Prompt not found.", {status:404});
        return new Response(JSON.stringify(prompt),{status:200})
    }catch(error){
        return new Response("Failed to fetch the prompt",{status:500})
    }
}

// patch(edit)

export const PATCH = async (request, {params})=> {
    const {prompt, tag} = await request.json();
    try{
        await connectToDB();
        const existing = await Prompt.findById (params.id);
        if(!prompt) return new Response ("Prompt not found.", {status:404});
        existing.prompt=prompt;
        existing.tag=tag;
        return new Response(JSON.stringify(existing),{status:200})

    }catch (error) {
        return new Response("Failed to update the prompt",{status:500})
    }
}
// delete

export const DELETE = async (request, {params}) => {
    try{
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response ("Prompt deleted sucessfully", {status:200})
    }catch(error){
        return new Response("Failed to delete the prompt",{status:500})
    }
}