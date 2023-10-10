import React from 'react';
import { Container } from 'reactstrap';

export function Layout({ children }) {
    return (
        <div>
            <Container tag="main">
                {children}
            </Container>
        </div>
    );
}
