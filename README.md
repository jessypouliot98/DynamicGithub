# DynamicGithub
A dynamic image server for my Github profile

**Project deprecated** - The goal was to make a board game (with maybe a basic AI) to put on my github profile.
The idea of how this would work is to keep a user session with either cookies, ip or anything that could be found unique between visitors.
With this session I thought I could host an image server that redirects an image to the specified game piece to make a Tic-Tac-Toe or Connect-4 based on clicked links and image links that redirects to the appropriate game tile.
Unfortunately, this is not possible as Github caches these images on their CDN, making everything static and unplayable :/
