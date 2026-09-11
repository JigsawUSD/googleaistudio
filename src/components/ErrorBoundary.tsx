import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  constructor(props: Props) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fff8f7] flex flex-col items-center justify-center p-6 text-center text-[#251918]">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white shadow-xl border border-red-100">
            <span className="text-4xl block mb-4">☕</span>
            <h1 className="font-serif text-2xl font-bold text-[#942225] mb-2">
              Di Napoli Sorveteria & Cafeteria
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Ocorreu uma instabilidade momentânea ao carregar a página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-full bg-[#942225] hover:bg-[#78181b] text-white font-medium text-sm transition-all shadow-md cursor-pointer"
            >
              Recarregar Página
            </button>
            {this.state.error && (
              <pre className="mt-4 p-3 bg-gray-50 rounded-lg text-left text-xs text-gray-500 overflow-x-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
