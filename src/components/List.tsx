import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useMessage } from '../context/MessageProvider'

export default function ChatList() {
  const { messages } = useMessage()

  return (
    <List sx={{ width: '100%', margin: '0 auto', bgcolor: 'background.paper' }}>
      {
        messages.map(({ role, content }, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={role} />
            </ListItemAvatar>
            <ListItemText
              primary={role}
              secondary={content as string}
            />
          </ListItem>
        ))
      }
    </List>
  );
}