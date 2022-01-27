import { Field, Int, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Post {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    title: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
}
