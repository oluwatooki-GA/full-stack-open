import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { NotificationProvider } from "./NotificationsContext.jsx";
import { UserProvider } from './UserContext.jsx';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <UserProvider>
            <NotificationProvider >
                <App />
            </NotificationProvider>
        </UserProvider>
    </QueryClientProvider>
);