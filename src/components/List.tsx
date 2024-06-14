import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useMessage } from '../context/MessageProvider'
import { yellow } from '@mui/material/colors';
import chatIcon from '../icon.svg'

export default function ChatList() {
  const { messages } = useMessage()

  return (
    <List sx={{ width: '100%', margin: '0 auto', bgcolor: 'background.paper' }}>
      {
        messages.map(({ role, content }, index) => (
          <ListItem style={{ marginBottom: 10 }} key={index} alignItems="flex-start">
            <ListItemAvatar>
              {
                role === 'user' ?
                <Avatar sx={{ bgcolor: yellow[600] }} alt={role} src='1.png' /> :
                <Avatar alt={role} src={chatIcon} />
              }
            </ListItemAvatar>
            <ListItemText
              primary={role === 'user' ? 'You' : role}
              secondary={content as string}
            />
          </ListItem>
        ))
      }
    </List>
  );
}