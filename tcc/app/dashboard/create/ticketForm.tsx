import { NumberInput, SubmitButton, TextArea, TextInput } from "@/components/input";

export function TicketForm() 
{
    return (
        <>

            <form className="my-10 mx-auto gap-y-4 flex flex-col">
                <TextInput name={'assunto'} label={'Assunto:'}/>
                <TextArea name={'desc'} label={'Descrição:'}/>
                <NumberInput name={'importancia'} label={'O quanto esse problema te atrapalha de 1 a 10:'}/>
                <SubmitButton/>
            </form>
        </>
    )
}