import { friendService } from "@/services/friend.service";
import type { FriendState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useFriendStore = create<FriendState>((set, get) => ({
  loading: false,
  searchByUsername: async (username) => {
    try {
      set({ loading: true });
      const user = await friendService.searchByUsername(username);
      return user;
    } catch (error) {
      console.error("Lỗi xảy ra khi tìm user bằng username", error);
      toast.error("Lỗi xảy ra khi tìm user bằng username");
      return null;
    } finally {
      set({ loading: false });
    }
  },
  addFriend: async (to, message) => {
    try {
      set({ loading: true });
      const resultMessage = await friendService.sendFriendRequest(to, message);
      return resultMessage;
    } catch (error) {
      console.error("Lỗi xảy ra khi add Friend", error);
      toast.error("Lỗi xảy ra khi gửi kết bạn. Hãy thử lại");
    } finally {
      set({ loading: false });
    }
  },
}));
