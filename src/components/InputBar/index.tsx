import { IconButton, TextField } from "@mui/material"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from './index.module.css'
import { useMessage } from '../../context/MessageProvider'
import { useRef } from "react";
import { ChatCompletionMessageParam } from "openai/resources";

function InputBar() {
  const { sendMessage } = useMessage()
  const formRef = useRef<HTMLFormElement>(null)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const newMessage: ChatCompletionMessageParam = {
      role: 'user',
      content: formJson.message
    }
    sendMessage(newMessage)
    formRef.current?.reset()
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (formRef.current) {
        handleSubmit(event)
      }
    }
  }

  return (
    <div className={styles.root}>
      <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
        <div className={styles.inputWrapper}>
          <TextField
            multiline
            fullWidth
            required
            maxRows={5}
            name="message"
            placeholder="Message chat..."
          />
          <IconButton className={styles.btn} type="submit" sx={{ p: '10px' }} aria-label="search">
            <ArrowUpwardIcon />
          </IconButton>
        </div>
      </form>
    </div>
  )
}

export default InputBar