import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CreateEventDto } from "./create-event.dto";

@Controller('/events')
export class EventsController {
    @Get()
    findAll() {
        return [
            {id: 1, name: "First Event"},
            {id: 2, name: "Second Event"}
        ];
    }

    @Get(':id')
    findOne(@Param('id') id) {
        return {id: 1, name: "First Event"};
    }

    @Post()
    create(@Body() input: CreateEventDto) {
        return input;
    }

    @Patch(':id')
    update(@Param('id') id, @Body() input) {
        return input;
    }

    @Delete(':id')
    @HttpCode(204) // No content
    remove(@Param('id') id) {}    
}
