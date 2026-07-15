import { friendService } from "@/services/friend.service";
import type { FriendState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useFriendStore = create<FriendState>((set) => ({
  friends: [],
  loading: false,
  receivedList: [],
  sentList: [],
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
  getAllFriendRequests: async () => {
    try {
      set({ loading: true });
      const result = await friendService.getAllFriendRequest();
      if (!result) return;

      const { received, sent } = result;

      set({ receivedList: received, sentList: sent });
    } catch (error) {
      console.error("Lỗi xảy ra khi get All friend", error);
    } finally {
      set({ loading: false });
    }
  },
  acceptRequest: async (requestId: string) => {
    try {
      set({ loading: true });
      await friendService.acceptRequest(requestId);
      // chấp nhận xong thì loại bỏ id đ
      set((state) => ({
        receivedList: state.receivedList.filter((r) => r._id !== requestId),
      }));
      toast.success("Đã chấp nhận kết bạn");
    } catch (error) {
      console.error("Lỗi xảy ra khi chấp nhận kết bạn", error);
    } finally {
      set({ loading: false });
    }
  },
  declineRequest: async (requestId: string) => {
    try {
      set({ loading: true });
      await friendService.declineRequest(requestId);
      set({ loading: false });
      set((state) => ({
        receivedList: state.receivedList.filter((r) => r._id !== requestId),
      }));
      toast.success("Đã từ chối kết bạn");
    } catch (error) {
      console.error("Lỗi xảy ra khi từ chối kết bạn", error);
    } finally {
      set({ loading: false });
    }
  },
  getFriends: async () => {
    try {
      set({ loading: true });
      const friends = await friendService.getFriendList();
      set({ friends: friends });
    } catch (error) {
      console.error("Lỗi xảy ra khi load friends", error);
    } finally {
      set({ loading: false });
    }
  },
}));
