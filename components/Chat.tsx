'use client';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const predefinedQuestions = [
    "How do I get the best results?",
    "What happens to my uploaded pictures?",
    "How many pictures are taken during a fine tuning?"
  ];

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="mb-4 flex space-x-6">
        {predefinedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => {
              const syntheticEvent = {
                target: { value: question }
              } as React.ChangeEvent<HTMLInputElement>;
              handleInputChange(syntheticEvent);
              handleSubmit(new Event('submit'));
            }}
            className="p-4 border rounded-xl border-stone-300 bg-stone-100 text-stone-800 hover:shadow-lg transition-all outline outline-4 outline-offset-2 outline-stone-300/0 hover:outline-4 hover:outline-offset-2 hover:outline-stone-300/50"
          >
            {question}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto mb-4 max-h-[490px]">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap py-4 text-md">
          {m.role === 'user' ? <UserIcon/> : <Heart2Icon/>}
          {m.content}
        </div>
      ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="p-4 fixed bottom-0 w-full max-w-md mb-16 md:mb-20 border rounded-full transition-all border-gray-300 shadow-lg hover:shadow-xl outline outline-8 outline-offset-4 outline-stone-300/50 hover:outline-offset-0 hover:outline-2 hover:outline-stone-300/80"
          value={input}
          placeholder="Hey, how can I help you?"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}



export function Heart2Icon() {
  return (
      <svg className="rounded-full bg-stone-700 p-1 text-stone-100 w-4 h-4 float-left mr-2" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
)
}

export function UserIcon() {
  return (
<svg className="rounded-full bg-stone-100 p-1 text-stone-800 w-4 h-4 float-left mr-2" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
  )
}
