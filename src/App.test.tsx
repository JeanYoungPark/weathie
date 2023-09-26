import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Weather } from 'pages/Weather';
import { Search } from 'pages/Search';

describe('App', () => {
    it("render /", () => {
        render(<Weather />, { wrapper: Router });
    });
    
    it('render /search', () => {
        render(<Search />, { wrapper: Router });    
    });
});