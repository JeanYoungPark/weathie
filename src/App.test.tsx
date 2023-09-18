import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
    test("render /", () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
    });
    
    test('render /search', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <App />
            </MemoryRouter>
        );    
    });
});