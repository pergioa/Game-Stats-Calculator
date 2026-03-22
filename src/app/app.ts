import { Component} from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavBar } from "./components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
