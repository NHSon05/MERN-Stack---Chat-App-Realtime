import { useFriendStore } from "@/stores/useFriendStore";
import FriendRequestItem from "./FriendRequestItem";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";

const ReceivedRequest = () => {
  const { acceptRequest, declineRequest, loading, receivedList } =
    useFriendStore();

  if (!receivedList || receivedList.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Bạn chưa có lời mời kết bạn nào
      </p>
    );
  }

  const handleAccept = async (requestId: string) => {
    try {
      await acceptRequest(requestId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async (requestId: string) => {
    try {
      await declineRequest(requestId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-3 mt-4">
      {receivedList.map((req) => (
        <FriendRequestItem
          key={req._id}
          requestInfo={req}
          type="received"
          actions={
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                className="h-8 w-8 rounded-full bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 shadow-none"
                onClick={() => handleAccept(req._id)}
                disabled={loading}
              >
                <Check className="size-4" />
              </Button>
              <Button
                size="icon"
                className="h-8 w-8 rounded-full bg-destructive/15 text-destructive hover:bg-destructive/25 shadow-none"
                onClick={() => handleDecline(req._id)}
                disabled={loading}
              >
                <X className="size-4" />
              </Button>
            </div>
          }
        />
      ))}
    </div>
  );
};
export default ReceivedRequest;
