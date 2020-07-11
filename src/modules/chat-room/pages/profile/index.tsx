import React from 'react';
import { useParams } from 'react-router';

export function ProfilePage() {
    let { slug } = useParams();

    return (
        <div>
            {`This is profile ${slug}`}
        </div>
    );
}
