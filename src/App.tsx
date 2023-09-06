import { Search } from 'pages/Search';
import { Weather } from 'pages/Weather';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Route path="/" Component={Weather} />
            <Route path="/search" Component={Search} />
        </BrowserRouter>
    );
}

export default App;
