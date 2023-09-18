import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Weather } from 'pages/Weather';


describe('Weather', () => {
    it("render correctly", () => {
        renderWeather();
        expect(screen.getByText("7월 27일 목요일")).toBeInTheDocument();
    });
});

function renderWeather() {
    return render(<Weather />, { wrapper: Router });

}