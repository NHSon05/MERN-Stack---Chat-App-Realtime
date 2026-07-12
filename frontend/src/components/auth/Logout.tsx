import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

const Logout = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Không thể logout", error);
      toast.error("Không thể logout");
    }
  };
  return (
    <Button variant={"completeGhost"} onClick={handleLogout}>
      <LogOut className="text-destructive" />
      Đăng xuất
    </Button>
  );
};

export default Logout;
