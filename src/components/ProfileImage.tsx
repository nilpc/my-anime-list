import { forwardRef } from "react";

interface ProfileImageProps {
  imageUrl: string;
  alt: string;
}

const ProfileImage = forwardRef<HTMLDivElement, ProfileImageProps>(
  ({ imageUrl, alt }, ref) => {
    return (
      <div className="img" ref={ref}>
        <img src={imageUrl} alt={alt} />
      </div>
    );
  }
);

export default ProfileImage;
