import {
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { UserEntity } from '../auth/user.entity';

import { CreateLectureDto } from './dto/create-lecture.dto';
import { LectureService } from './lecture.service';

import { GetUser } from 'src/auth/get-user.decorator';

@Controller('lecture')
@UseGuards(AuthGuard())
export class LectureController {
  constructor(private lectureService: LectureService) {}

  @Post('/:id')
  @UseInterceptors(FileInterceptor('video'))
  @UsePipes(ValidationPipe)
  createNewLecture(
    @GetUser() user: UserEntity,
    @UploadedFile() video: any,
    @Param('id') section_id: string,
    @Body() createLectureDto: CreateLectureDto,
  ): Promise<Object> {
    return this.lectureService.createNewLecture(
      section_id,
      createLectureDto,
      video,
    );
  }

  @Patch('/:id/update')
  @UseInterceptors(FileInterceptor('video'))
  @UsePipes(ValidationPipe)
  updateLecture(
    @GetUser() user: UserEntity,
    @Param('id') lecture_id: string,
    @UploadedFile() video: any,
    @Body() createLectureDto: CreateLectureDto,
  ): Promise<Object> {
    return this.lectureService.updateLecture(
      lecture_id,
      createLectureDto,
      video,
    );
  }

  @Delete('/:id')
  deleteLecture(
    @GetUser() user: UserEntity,
    @Param('id') lecture_id: string,
  ): Promise<void> {
    return this.lectureService.deleteLecture(lecture_id);
  }

  // //For futute file upload feature
  // // @Post('/files/:id')
  // // @UseInterceptors(
  // //   AnyFilesInterceptor()
  // // )
  // // @UsePipes(ValidationPipe)
  // // addStudyDocuments(
  // //   @UploadedFiles() files: any,
  // //   @Param('id') id: string,
  // //   @Body() createlecturedto: CreateLectureDto,
  // // ): Promise<LectureEntity> {
  // //   //return this.lectureservice.addStudyDocuments(id, createlecturedto, file);
  // // }
}