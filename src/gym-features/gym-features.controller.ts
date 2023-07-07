import { Body, Controller, Delete, HttpException, HttpStatus, Param, Post, Req, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GymFeaturesService } from './gym-features.service';

import { diskStorage } from 'multer'
import { extname } from 'path'
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddManagerDTO } from './DTO/GymFeaturesDTO';



let multerOptions = {
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: diskStorage({
        destination: './uploads/images'
        ,
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            cb(null, `${randomName}${extname(file.originalname)}`)
        }
    })
}

@Controller('gym-features')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('gym-features')
export class GymFeaturesController {
    constructor(
        private gymFeature: GymFeaturesService
    ) { }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async upload(
        @UploadedFile() file: any,
        @Param() param: { id: number }
    ) {
        const { id: gymId } = param;
        return this.gymFeature.createGalleryLinke(file, gymId)
    }

    @Delete('delete/:id')
    async deleteImage(
        @Param() param: { id: number }
    ) {
        const { id: imageId } = param;
        return this.gymFeature.deleteImage(imageId)
    }

    @Post('addManager/:gymId')
    async addManager(
        @Param() param: { gymId: number },
        @Body() body: AddManagerDTO
    ) {
        const { phoneNumber, description } = body;
        const { gymId } = param;
        return this.gymFeature.add_manager(phoneNumber, description, gymId)
    }

}
