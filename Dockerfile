FROM node:latest AS fend
WORKDIR /client
COPY Cookbook/ClientApp/ .
RUN npm ci
RUN npm build

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
COPY Cookbook .
COPY --from=fend /client/build ClientApp/build
RUN dotnet restore
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /out .
EXPOSE 7255
ENTRYPOINT ["dotnet", "Cookbook.dll"]