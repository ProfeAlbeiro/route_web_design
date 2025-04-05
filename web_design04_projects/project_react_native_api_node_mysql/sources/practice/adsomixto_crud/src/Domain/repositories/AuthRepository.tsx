import { ResponseApiDelivery } from "../../Data/sourse/remote/models/ResponseApiDelivery";
import { User} from "../../Domain/entities/User";

export interface AuthRepository {
    login(email: string, password: string): Promise<ResponseApiDelivery>;
    register(user: User): Promise<ResponseApiDelivery>;
}