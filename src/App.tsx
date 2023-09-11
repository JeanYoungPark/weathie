import { Search } from 'pages/Search';
import { Weather } from 'pages/Weather';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Weather} />
                <Route path="/search" Component={Search} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
