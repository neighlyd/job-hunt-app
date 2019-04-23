import React from 'react';

import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <div className="page-header">
            <div className="container">
                <h1 className="page-header__title">404</h1>
            </div>
        </div>
        <div className="container">
            <p className="container__content">I'm not sure how you got here, but you're really not supposed to be here.</p>
            <Link to="/" >Please go home</Link>
        </div>
    </div>
    );

export default NotFoundPage;