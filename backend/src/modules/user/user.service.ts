import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { BcryptService } from '@/common/bcrypt/bcrypt.service';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from './repository/user.repository.interface';
import { User } from './entity/user.entity';
import { UserFilterParams } from './dtos/find-all-user.dto';
import { Role } from './enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.bcryptService.hash(createUserDto.password);

    const user = new User({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role ?? Role.USER,
      points: createUserDto.points ?? 0,
    });

    return this.userRepository.create(user);
  }

  async findAll(params: UserFilterParams) {
    return this.userRepository.findAll(params);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(
        updateUserDto.email,
      );

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    const updatedUser = new User({
      ...user,
      ...updateUserDto,
      ...(updateUserDto.password && {
        password: await this.bcryptService.hash(updateUserDto.password),
      }),
    });

    return this.userRepository.update(updatedUser);
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.delete(user.id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async updatePoints(id: string, points: number) {
    const user = await this.findOne(id);
    const updatedUser = new User({
      ...user,
      points: user.points + points,
    });
    return this.userRepository.update(updatedUser);
  }
}
