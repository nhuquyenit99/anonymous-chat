import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
    return (
        <Result
            style={{ flex: 1 }}
            status="404"
            title="Not found"
            subTitle="Sorry, the channel you visited does not exist any more."
            extra={[
                <Link to="/"><Button type="primary">Go Home</Button></Link>,
                <Button onClick={() => window.location.reload()}>Try Again</Button>,
            ]}
        />
    );
}
