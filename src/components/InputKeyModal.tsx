import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { initOpenAI } from '../context/MessageProvider'

export default function InputKeyModal() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const apiKey = formJson.apiKey;
            initOpenAI(apiKey)
            handleClose();
          },
        }}
      >
        <DialogTitle>请输入您的 OpenRouter API key</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="apiKey"
            name="apiKey"
            label="apiKey"
            fullWidth
            variant="standard"
            defaultValue={'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'}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}