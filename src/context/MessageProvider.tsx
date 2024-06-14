import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/chat'
import { useState, createContext, useContext, FC, PropsWithChildren } from 'react'

let openai: OpenAI
export function initOpenAI(apiKey: string) {
  openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey,
    dangerouslyAllowBrowser: true,
  })
}

interface MessageContextType {
  messages: ChatCompletionMessageParam[];
  sendMessage: (newMessage: ChatCompletionMessageParam) => Promise<void>;
}

// Context
const MessageContext = createContext<MessageContextType | undefined>(undefined);
export const useMessage = () => {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
}

const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [ messages, setMessages ] = useState<ChatCompletionMessageParam[]>([])

  const sendMessage = async (newMessage: ChatCompletionMessageParam) => {
    console.log(newMessage)
    if (!openai) return
    setMessages((prevMessages) => [...prevMessages, newMessage])
    try {
      const completion = await openai.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        // model: "mistralai/mistral-7b-instruct",
        messages: [...messages, newMessage],
      })
      const message = completion.choices[0]!.message
      setMessages((prevMessages) => [...prevMessages, message])
      console.log(completion.choices)
    } catch (error) {
      console.error("Error in sending message: ", error)
    }
  }

  // setTimeout(async () => {
  //   await sendMessage('我是 Jesse，请记住我的名字')
  //   await sendMessage('我是谁?')
  // }, 1000)

  return (
    <MessageContext.Provider
      value={{ messages, sendMessage }}
    >
      { children }
    </MessageContext.Provider>
  )
}

export default MessageProvider