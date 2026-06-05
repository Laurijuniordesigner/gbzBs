import { Video, Camera, MessageCircle, Shield, Tv, Music, Gamepad2 } from 'lucide-react';

export default function SocialIcon({ name }) {
  switch (name.toLowerCase()) {
    case 'youtube':   return <Video size={30} color="#FF0000" />;
    case 'instagram': return <Camera size={30} color="#E1306C" />;
    case 'twitter':   return <MessageCircle size={30} color="#1DA1F2" />;
    case 'twitch':    return <Tv size={30} color="#9146FF" />;
    case 'tiktok':    return <Music size={30} color="#69C9D0" />;
    case 'discord':   return <Gamepad2 size={30} color="#5865F2" />;
    default:          return <Shield size={30} color="#00d0ff" />;
  }
}
