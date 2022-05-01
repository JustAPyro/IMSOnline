from website import create_app

# Create the app
app = create_app()

# If we run this file (Excluding imports) run the app
if __name__ == '__main__':
    app.run(debug=True)
