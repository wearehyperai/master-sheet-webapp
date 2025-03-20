
import { IUserUploads } from '@/models/user_uploads';
import React from 'react';

interface CardProps {
    uploads: IUserUploads[];
    onClickCard: (index: number) => void;
}

const CardWithLink: React.FC<CardProps> = ({ uploads, onClickCard }) => {
    return (
        <div className="flex flex-col gap-2 cursor-pointer">
            {uploads.map((upload, index) => (
                <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg" onClick={() => onClickCard(index)}>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{upload.displayFileName}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardWithLink;